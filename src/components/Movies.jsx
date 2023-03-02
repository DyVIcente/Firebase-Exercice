import { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


const Movies = () => {
    // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

    const [movieList, setMovieList] = useState([]);

    
  const moviesCollectionRef = collection(db, "movies");

    const getMovieList = async () => {
        try {
          const data = await getDocs(moviesCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMovieList(filteredData);
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {
        getMovieList();
      }, []);
    
      const onSubmitMovie = async () => {
        try {
          await addDoc(moviesCollectionRef, {
            title: newMovieTitle,
            releaseDate: newReleaseDate,
            receivedAnOscar: isNewMovieOscar,
            userId: auth?.currentUser?.uid,
          });
          getMovieList();
        } catch (err) {
          console.error(err);
        }
      };
    
      const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
        alert('A movie has been Deleted')
        getMovieList();
      };
    
      const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, { title: updatedTitle });
        getMovieList();
      };


      

  return (
    <div className='pt-10 px-10 bg-black'>
    <h1 className='p-2 text-[40px] text-white uppercase font-bold'>Add a Movie</h1>
    <div className='flex flex-col items-center p-2 bg-[#454545] rounded-[10px]'>
        <input
          className='border p-2 m-2 rounded-[10px]'
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className='border p-2 m-2 rounded-[10px]'
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          className='border p-2 m-2 rounded-[10px]'
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label className='text-white'>Received an Oscar</label>
        <button className='p-2 m-2 text-white rounded-[10px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200' onClick={onSubmitMovie}> Submit Movie</button>
      </div>
      <h1 className='p-2 text-[40px] text-white uppercase font-bold mt-4'>All Movies</h1>
    <div className='flex flex-col justify-center items-center p-2 bg-[#454545] rounded-[10px] mt-4'>
        {movieList.map((movie) => (
          <div key={movie.index}>
            <h2 className='p-2 text-[25px] uppercase' style={{ color: movie.receivedAnOscar ? "gold" : "white" }}>
              {movie.title}
            </h2>
            <p className='p-2 text-white'> Date: {movie.releaseDate} </p>

            <button className='p-2 m-2 rounded-[10px] text-white bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 hover:opacity-90' onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            <input
            className='border p-2 m-2 rounded-[10px]'
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button className=' text-white p-2 m-2 rounded-[10px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 hover:opacity-90' onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      </div>
  )
}

export default Movies
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { SiFirebase } from 'react-icons/si';


const Auth = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className='flex justify-between p-2 bg-black '>
      <p className='flex items-center text-white w-[200px] p-2 text-[50px] font-bold'>Firebase Exercice </p>
      <p className='flex justify-center items-center text-white text-[55px]'><SiFirebase /></p>
      {user ? (
        <div className='flex flex-col p-6 rounded w-[250px]'>
          <div className='flex items-center justify-center'>
            <img className=" rounded-full w-[120px]" src={user.photoURL || 'https://via.placeholder.com/150'} alt='profile_image' />
          </div>
          <p className='flex items-center justify-center text-white'>{user.displayName}</p>
          <button className='flex items-center justify-center text-black bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 rounded ' onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className=" text-white bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 rounded-[10px] p-2 m-10 ">Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;

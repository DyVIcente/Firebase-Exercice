import { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadFile = () => {

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      const url = await getDownloadURL(filesFolderRef);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='pb-10 px-10 '>
        <h2 className='p-2 mt-4 mb-[16px] text-[40px] text-white uppercase font-bold'>Upload File</h2>
    <div className='flex flex-col justify-center items-center p-2 bg-[#454545] rounded-[10px] '>
        <input className=' p-2 m-2 rounded-[10px] bg-white' type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button className=' text-white p-2 m-2 rounded-[10px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 hover:opacity-90' onClick={uploadFile}> Upload File </button>
        {imageUrl && <img src={imageUrl} alt="uploaded_file" className='w-[250px]' />}
    </div>
    </div>
  )
}

export default UploadFile;

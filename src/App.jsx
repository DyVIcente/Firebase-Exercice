import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth.jsx';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import Movies from './components/Movies';
import UploadFile from './components/UploadFile';

function App() {
  return (
    <div className="App">
      <Auth />
      <Movies />
      <UploadFile />
    </div>
  );
}

export default App;
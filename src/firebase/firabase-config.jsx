import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyAL2i_QGdXIXMBpolOH1TaI8hQF4W98H00',
  authDomain: 'react-app-e4d3d.firebaseapp.com',
  projectId: 'react-app-e4d3d',
  storageBucket: 'react-app-e4d3d.appspot.com',
  messagingSenderId: '652607071891',
  appId: '1:652607071891:web:bb36b6edf96516e545cf66',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider
};

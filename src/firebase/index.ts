import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import firebaseConfig from '../config/firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDn9z4391z2UPWHFnReVBh82qNcTgArDDs',
  authDomain: 'a2p-teklogix.firebaseapp.com',
  databaseURL: 'https://a2p-teklogix-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'a2p-teklogix',
  storageBucket: 'a2p-teklogix.appspot.com',
  messagingSenderId: '373397648366',
  appId: '1:373397648366:web:5f1df77ea80c380e9e54ff',
  measurementId: 'G-9HJY4CJZS9',
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  firebase.firestore().useEmulator('localhost', 8080);
  firebase.auth().useEmulator('http://localhost:9099');
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp, firebase as default };

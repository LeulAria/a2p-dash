import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from '../config/firebase';

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === "localhost") {
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.auth().useEmulator("http://localhost:9099");
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp, firebase as default };

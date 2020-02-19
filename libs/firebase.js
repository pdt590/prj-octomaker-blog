import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//import 'firebase/analytics';

const config = {
  apiKey: "AIzaSyC0kx87poAPStV7Ml_xCqs541AHEj7R3PE",
  authDomain: "octomaker-dev.firebaseapp.com",
  databaseURL: "https://octomaker-dev.firebaseio.com",
  projectId: "octomaker-dev",
  storageBucket: "octomaker-dev.appspot.com",
  messagingSenderId: "693975261244",
  appId: "1:693975261244:web:c9eb06a1aa9551963fe339",
  measurementId: "G-38GE3EPVJE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  //firebase.analytics(); // TODO
}

export default firebase;

import firebase from "firebase/app";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyAR2VmHWTiwo8UhlPNunxfFsEs3sul-H2E",
  authDomain: "octomaker-7e37b.firebaseapp.com",
  databaseURL: "https://octomaker-7e37b.firebaseio.com",
  projectId: "octomaker-7e37b",
  storageBucket: "octomaker-7e37b.appspot.com",
  messagingSenderId: "727084698256",
  appId: "1:727084698256:web:dabadcef2a39c9e0a86615",
  measurementId: "G-V0LW4P0BNJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.analytics();
}

export default firebase;

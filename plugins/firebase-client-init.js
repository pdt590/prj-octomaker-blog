import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/functions";
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

// Run both client and server side
// Run on server side when it is called/imported by nuxtServerInit/async/fetch
export const firebase = !firebaseApp.apps.length
  ? firebaseApp.initializeApp(config)
  : firebaseApp.app();
export const database = firebaseApp.database();
export const storage = firebaseApp.storage();
export const functions = firebaseApp.app().functions("asia-east2");

// Run only client side
export const analytic = process.client ? firebaseApp.analytics() : null;

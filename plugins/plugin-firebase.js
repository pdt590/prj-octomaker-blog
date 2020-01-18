import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBjPUKYPNR62SfizvUgbc-2e7uFs9t_4KQ",
    authDomain: "octomaker-prod.firebaseapp.com",
    databaseURL: "https://octomaker-prod.firebaseio.com",
    projectId: "octomaker-prod",
    storageBucket: "octomaker-prod.appspot.com",
    messagingSenderId: "850222533403",
    appId: "1:850222533403:web:154548850dc95f870fe1be"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase
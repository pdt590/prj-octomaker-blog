const adminApp = require("firebase-admin");
const serviceAccount = require("~/libs/key.json");

let admin;
if (adminApp.apps.length > 0) {
  admin = adminApp;
} else {
  admin = adminApp.initializeApp({
    credential: adminApp.credential.cert(serviceAccount),
    databaseURL: "https://octomaker-7e37b.firebaseio.com"
  });
}

module.exports = admin;
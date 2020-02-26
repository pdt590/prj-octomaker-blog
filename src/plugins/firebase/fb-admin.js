const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("./key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://octomaker-7e37b.firebaseio.com"
  });
}

export default admin;
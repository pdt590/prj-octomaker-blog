import firebase from "~/plugins/firebase/fb";
const db = firebase.database();
const usersRef = db.ref("users");

// For build process
let admin = null;
let cookieparser = null;
if (process.server) {
  cookieparser = require("cookieparser");
  admin = require("firebase-admin");
}

export default {
  actions: {
    async nuxtServerInit(vuexContext, { req, error }) {
      try {
        if (req) {
          if (!req.headers.cookie) {
            await vuexContext.dispatch("logOut"); // * Logout because `user` is still available in store at server side
            return;
          }
          const userCookieString = cookieparser.parse(req.headers.cookie)
            .__session;
          if (!userCookieString) {
            console.error("[nuxtServerInit]", "Invalid token");
            await vuexContext.dispatch("logOut");
            return;
          }
          const userCookie = JSON.parse(userCookieString);
          const token = userCookie.token;
          const uid = userCookie.uid;
          const expirationDate = userCookie.expirationDate;
          try {
            await admin.auth().verifyIdToken(token);
          } catch (e) {
            console.error("[nuxtServerInit]", "Invalid token");
            await vuexContext.dispatch("logOut");
            return;
          }
          if (new Date().getTime() > +expirationDate) {
            console.error("[nuxtServerInit]", "Time expired");
            await vuexContext.dispatch("logOut");
            return;
          }
          const userData = await usersRef.child(uid).once("value");
          const userObj = userData.val();
          const userProfile = {
            id: uid,
            ...userObj
          };
          vuexContext.commit("setUser", userProfile);
        }
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.error("[ERROR-nuxtServerInit]", e);
        error({ statusCode: 500, message: "nuxtServerInit() Error" });
      }
    }
  }
};

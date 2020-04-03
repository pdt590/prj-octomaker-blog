import firebase from "~/plugins/firebase/fb-tools";
const db = firebase.database();
const usersRef = db.ref("users");

// For build process
let admin = null;
let cookieparser = null;
if (process.server) {
  cookieparser = require("cookieparser");
  admin = require("firebase-admin"); // can't require from "~/plugins/firebase/fb-admin" - why? - TODO
}

export default {
  actions: {
    async nuxtServerInit(vuexContext, { req, error }) {
      try {
        if (req) {
          if (!req.headers.cookie) {
            /* Logout here because 'user' is still available at store on server side */ 
            await vuexContext.dispatch("logOut");
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
          console.error("11111", userCookie)
          const token = userCookie.token;
          const uid = userCookie.uid;
          const expirationDate = userCookie.expirationDate;
          try {
            /* Verify user token sent from clien side */
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

          /* Use firebase to call from server side - how? - TODO */
          const userData = await usersRef.child(uid).once("value");
          const userObj = userData.val();
          console.error("22222", userObj)
          const userProfile = {
            id: uid,
            ...userObj
          };
          vuexContext.commit("setUser", userProfile);
        }
      } catch (e) {
        console.error("[ERROR-nuxtServerInit]", e);
        error({ statusCode: 500, message: "nuxtServerInit() Error" });
      }
    }
  }
};

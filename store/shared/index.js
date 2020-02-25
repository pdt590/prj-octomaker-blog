import firebase from "~/libs/firebase";
const db = firebase.database();
const usersRef = db.ref("users");

export default {
  actions: {
    async nuxtServerInit(vuexContext, { req, error }) {
      try {
        if (process.env.target === "firebase") {
          if (req) {
            if (!req.headers.cookie) {
              await vuexContext.dispatch("logOut"); // * Logout because `user` is still available in store at server side
              return;
            }
            const cookieparser = require("cookieparser");
            const userCookieString = cookieparser.parse(req.headers.cookie)
              .__session;
            if (!userCookieString) {
              await vuexContext.dispatch("logOut");
              return;
            }
            const userCookie = JSON.parse(userCookieString);
            const token = userCookie.token;
            const uid = userCookie.uid;
            const expirationDate = userCookie.expirationDate;
            /* TODO
            if (process.server) {
              const admin = require("firebase-admin");
              const decodedToken = admin.auth().verifyIdToken(token);
              if (!decodedToken) {
                console.error("[nuxtServerInit]", "Invalid token");
                vuexContext.dispatch("logOut");
                return;
              }
            }
             */
            if (new Date().getTime() > +expirationDate) {
              console.error("[nuxtServerInit]", "Time Expired");
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
        } else {
          let uid;
          let expirationDate;
          if (req) {
            if (!req.headers.cookie) {
              await vuexContext.dispatch("logOut"); // * Logout because `user` is still available in store at server side
              return;
            }
            let reqCookie = req.headers.cookie.split(";");

            let isUid = reqCookie.find(c => c.trim().startsWith("uid="));
            if (!isUid) {
              await vuexContext.dispatch("logOut");
              return;
            }
            uid = reqCookie
              .find(c => c.trim().startsWith("uid="))
              .split("=")[1];
            expirationDate = reqCookie
              .find(c => c.trim().startsWith("expirationDate="))
              .split("=")[1];
          }
          if (new Date().getTime() > +expirationDate || !uid) {
            console.error("[nuxtServerInit]", "Invalid uid");
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

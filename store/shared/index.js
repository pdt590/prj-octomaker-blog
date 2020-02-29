let admin;
let cookieparser;
if (process.server) {
  admin  = require("~/plugins/firebase-admin-init");
  cookieparser = require("cookieparser");
}

export default {
  actions: {
    async nuxtServerInit(vuexContext, { req, res, error }) {
      try {
        if (req) {
          if (!req.headers.cookie) {
            /* Logout here because 'user' is still available at store on server side */
            await vuexContext.dispatch("logOut");
            return;
          }
          const token = cookieparser.parse(req.headers.cookie)
            .__session;
          if (!token) {
            console.error("[nuxtServerInit]", "Invalid token");
            await vuexContext.dispatch("logOut");
            return;
          }
          let decodedToken = null;
          try {
            /* Verify user token sent from clien side */
            decodedToken = await admin.auth().verifyIdToken(token);
          } catch (e) {
            console.error("[nuxtServerInit]", "Invalid token");
            await vuexContext.dispatch("logOut");
            return;
          }
          /* Use firebase to call from server side - how? - TODO */
          const uid = decodedToken.uid;
          vuexContext.dispatch("loadAuthUser", uid);
        }
      } catch (e) {
        console.error("[ERROR-nuxtServerInit]", e);
        error({ statusCode: 500, message: "nuxtServerInit() Error" });
      }
    }
  }
};

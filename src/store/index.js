let admin;
let cookieparser;
if (process.server) {
  admin = require("~/plugins/firebase-admin-init");
  cookieparser = require("cookieparser");
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req, error }) {
    try {
      if (req) {
        if (!req.headers.cookie) {
          // Logout here because 'user' is still available at store on server side
          await dispatch("user/logOut", { root: true });
          return;
        }
        const token = cookieparser.parse(req.headers.cookie).__session;
        if (!token) {
          console.error("[nuxtServerInit]", "Invalid token");
          await dispatch("user/logOut", { root: true });
          return;
        }
        let decodedToken = null;
        try {
          // Verify user token sent from clien side
          decodedToken = await admin.auth().verifyIdToken(token);
        } catch (e) {
          console.error("[nuxtServerInit]", "Invalid token");
          await dispatch("user/logOut", { root: true });
          return;
        }
        // Use firebase to call from server side - how? - TODO
        const userId = decodedToken.uid;
        await dispatch("user/loadAuthUser", userId, { root: true });
      }
    } catch (e) {
      console.error("[ERROR-nuxtServerInit]", e);
      error({ statusCode: 500, message: "nuxtServerInit() Error" });
    }
  }
};

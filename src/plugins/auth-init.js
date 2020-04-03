import Cookies from "js-cookie";
import { firebase } from "~/plugins/firebase-client-init";

// Detect token ony when user log in or sign out (token = null)
export default context => {
  firebase.auth().addAuthTokenListener(token => {
    // 3600 sec (1h) = 0.04166667 Days
    Cookies.set("_session", token, { expires: token ? 0.083333333 : 0 }); // 2h
  });
};

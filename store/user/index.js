import firebase from "~/libs/firebase";
import Cookie from "js-cookie";
import { compressImage } from "~/libs/helpers";
const database = firebase.database();
const storage = firebase.storage();
const usersRef = database.ref("users");
const imageUsersRef = storage.ref("users");

export default {
  state: {
    authLoading: false,
    authError: null,
    user: null
  },
  mutations: {
    setAuthLoading(state, payload) {
      state.authLoading = payload;
    },
    setAuthError(state, payload) {
      state.authError = payload;
    },
    clearAuthError(state) {
      state.authError = null;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    clearAuthError(vuexContext) {
      vuexContext.commit("clearAuthError");
    },

    async signUserUp(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        await user.updateProfile({
          displayName: payload.username
        });
        await user.sendEmailVerification();
        const userProfile = {
          username: payload.username,
          email: payload.email,
          isActive: false,
          updatedDate: new Date().toISOString()
        };
        await usersRef.child(user.uid).set(userProfile);
        // * Persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
        Cookie.set("uid", user.uid);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + 2 * 3600 * 1000 // 2h expired time
        );
        const newUser = {
          id: user.uid,
          ...userProfile
        };
        vuexContext.commit("setUser", newUser);
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-signUserUp]", e);
      }
    },

    async signUserIn(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        const userData = await usersRef.child(user.uid).once("value");
        const userObj = userData.val();
        let userProfile = {};
        // Check in case of restoring email
        if (payload.email !== userObj.email) {
          await usersRef.child(user.uid).update({
            email: payload.email,
            isActive: true
          });
          userProfile = {
            ...userObj,
            id: user.uid,
            email: payload.email,
            isActive: true
          };
        } else {
          userProfile = {
            ...userObj,
            id: user.uid
          };
        }
        // Check in case of verifying email
        if (!userObj.isActive && user.emailVerified) {
          await usersRef.child(user.uid).update({
            isActive: true
          });
          userProfile.isActive = true;
        }

        // * persistent storage using cookie (or localstorage or firebase.auth().onAuthStateChanged())
        Cookie.set("uid", user.uid);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + 2 * 3600 * 1000 // 2h expired time
        );
        vuexContext.commit("setUser", userProfile);

        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-signUserIn]", e);
      }
    },

    async initAuth(vuexContext) {
      let uid = Cookie.get("uid");
      let expirationDate = Cookie.get("expirationDate");
      if (uid) {
        if (new Date().getTime() > +expirationDate) {
          vuexContext.dispatch("logOut");
        } else {
          // re-new expirationDate
          Cookie.set(
            "expirationDate",
            new Date().getTime() + 2 * 3600 * 1000 // 2h expired time
          );
        }
      }
    },

    async logOut(vuexContext) {
      await firebase.auth().signOut();
      Cookie.remove("uid");
      Cookie.remove("expirationDate");
      vuexContext.commit("setUser", null);

      if (process.client) {
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      }
    },

    async updateUserContent(vuexContext, newUserContent) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const user = firebase.auth().currentUser;
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;

        await usersRef.child(userId).update(newUserContent);

        await user.updateProfile({
          displayName: newUserContent.fullname
        });
        if (newUserContent.username !== loadedUser.username) {
          await vuexContext.dispatch("updatePostsByUser", {
            username: newUserContent.username
          });
        }
        vuexContext.commit("setUser", {
          ...loadedUser,
          ...newUserContent
        });
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        console.log("[ERROR-updateUserContent]", e);
      }
    },

    async updateUserEmail(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        let user = firebase.auth().currentUser;
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        const confirmPassword = payload.confirmPassword;
        const newEmail = payload.newEmail;
        const credential = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );
        await user.reauthenticateAndRetrieveDataWithCredential(credential);
        user = firebase.auth().currentUser; // RetrieveData
        await user.updateEmail(newEmail);
        await user.sendEmailVerification();
        await usersRef.child(userId).update({
          isActive: false,
          email: newEmail
        });
        vuexContext.commit("setUser", {
          ...loadedUser,
          isActive: false,
          email: newEmail
        });
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-updateUserEmail]", e);
      }
    },

    async updateUserPassword(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        let user = firebase.auth().currentUser;
        const confirmPassword = payload.confirmPassword;
        const newPassword = payload.newPassword;
        const credential = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );
        await user.reauthenticateAndRetrieveDataWithCredential(credential);
        user = firebase.auth().currentUser; // RetrieveData
        await user.updatePassword(newPassword);
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-updateUserPassword]", e);
      }
    },

    async updateUserAvatar(vuexContext, newAvatar) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const user = firebase.auth().currentUser;
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        const oldAvatar = loadedUser.avatar;
        if (oldAvatar) {
          await imageUsersRef.child(oldAvatar.metadata.name).delete();
        }
        if (!newAvatar) {
          await usersRef.child(userId).update({
            avatar: null
          });
          await vuexContext.dispatch("updatePostsByUser", {
            avatar: null
          });
          delete loadedUser.avatar;
          vuexContext.commit("setAuthLoading", false);
          return;
        }

        let avatarObject = null;
        const storageMetadata = {
          cacheControl: "public,max-age=31536000"
        };
        const cprAvatar = await compressImage(newAvatar);
        const ext = cprAvatar.name.slice(cprAvatar.name.lastIndexOf("."));
        const newAvatarName = userId + ext;
        const metaData = {
          name: newAvatarName,
          orgName: cprAvatar.name,
          size: cprAvatar.size,
          creator: userId
        };
        await imageUsersRef
          .child(newAvatarName)
          .put(cprAvatar, storageMetadata);
        const avatarDownloadUrl = await imageUsersRef
          .child(newAvatarName)
          .getDownloadURL();
        avatarObject = {
          metadata: metaData,
          url: avatarDownloadUrl
        };

        await user.updateProfile({
          photoURL: avatarObject.url
        });
        await usersRef.child(userId).update({
          avatar: avatarObject
        });
        await vuexContext.dispatch("updatePostsByUser", {
          avatar: avatarObject
        });
        const updatedUser = {
          ...loadedUser,
          avatar: avatarObject
        };
        vuexContext.commit("setUser", updatedUser);
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        console.log("[ERROR-updateAvatar]", e);
      }
    },

    async resetUserPassword(vuexContext, comfirmedEmail) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const auth = firebase.auth();
        await auth.sendPasswordResetEmail(comfirmedEmail);
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-resetUserPassword]", e);
      }
    },

    async handleResetPassword(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const auth = firebase.auth();
        await auth.confirmPasswordReset(
          payload.actionCode,
          payload.newPassword
        );
        // user.reload()
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-handleResetPassword]", e);
      }
    },

    async handleVerifyEmail(vuexContext, actionCode) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const auth = firebase.auth();
        await auth.applyActionCode(actionCode);
        // user.reload()
        const loadedUser = vuexContext.getters.user;
        if (loadedUser) {
          const userId = loadedUser.id;
          await usersRef.child(userId).update({
            isActive: true
          });
          vuexContext.commit("setUser", {
            ...loadedUser,
            isActive: true
          });
        }
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
        return true;
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-handleVerifyEmail]", e);
        return false;
      }
    },

    async handleRecoverEmail(vuexContext, actionCode) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        vuexContext.getters.user ? vuexContext.dispatch("logOut") : ``;

        const auth = firebase.auth();
        // Confirm the action code is valid
        const info = await auth.checkActionCode(actionCode);
        // Get the restored email address.
        const restoredEmail = info["data"]["email"];
        // Revert to the old email
        await auth.applyActionCode(actionCode);
        // Reset password
        await auth.sendPasswordResetEmail(restoredEmail);
        vuexContext.commit("setAuthLoading", false);
        return true;
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-handleRecoverEmail]", e);
        return false;
      }
    },

    async deleteUser(vuexContext, confirmPassword) {
      vuexContext.commit("setAuthLoading", true);
      vuexContext.commit("clearAuthError");
      try {
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        const userAvatar = loadedUser.avatar;
        await vuexContext.dispatch("deletePostsByUser", userId);
        await usersRef.child(userId).remove();
        let user = firebase.auth().currentUser;
        const credential = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );
        await user.reauthenticateAndRetrieveDataWithCredential(credential);
        user = firebase.auth().currentUser;
        await user.delete();
        if (userAvatar) {
          await imageUsersRef.child(userAvatar.metadata.name).delete();
        }
        Cookie.remove("uid");
        Cookie.remove("expirationDate");
        vuexContext.commit("setUser", null);
        vuexContext.commit("setAuthLoading", false);
        localStorage.setItem("auth-event", "");
        localStorage.removeItem("auth-event");
      } catch (e) {
        vuexContext.commit("setAuthError", e);
        console.log("[ERROR-deleteUser]", e);
      }
    },

    async isCorrectPassword(vuexContext, confirmPassword) {
      try {
        const user = firebase.auth().currentUser;
        const loadedUser = vuexContext.getters.user;
        const credential = await firebase.auth.EmailAuthProvider.credential(
          loadedUser.email,
          confirmPassword
        );
        await user.reauthenticateAndRetrieveDataWithCredential(credential);
      } catch (e) {
        console.log("[ERROR-isCorrectPassword]", e);
      }
    },

    async isUnique(vuexContext, payload) {
      try {
        const user = await usersRef
          .orderByChild("email")
          .equalTo(payload)
          .once("value");
        if (user.val()) return false;
        return true;
      } catch (e) {
        console.log("[ERROR-isUnique]", e);
        return false;
      }
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    authError(state) {
      return state.authError;
    },
    authLoading(state) {
      return state.authLoading;
    }
  }
};

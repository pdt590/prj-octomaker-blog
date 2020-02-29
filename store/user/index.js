import { database, storage, firebase } from "~/plugins/firebase-client-init";
import { genId, compressImage, reloadAll } from "~/libs/helpers";
import Cookie from "js-cookie";
const usersRef = database.ref("users");
const imageUsersRef = storage.ref("users");

export default {
  state: () => ({
    authLoading: false,
    user: null
  }),
  mutations: {
    setAuthLoading(state, payload) {
      state.authLoading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async loadUser(vuexContext, userId) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const userData = await usersRef.child(userId).once("value");
        const loadedUser = userData.val();
        vuexContext.commit("setAuthLoading", false);
        return loadedUser;
      } catch (e) {
        console.error("[ERROR-loadUser]", e);
      }
    },

    async loadAuthUser(vuexContext, userId) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const userData = await usersRef.child(userId).once("value");
        const loadedUser = userData.val();
        vuexContext.commit("setUser", loadedUser);
        vuexContext.commit("setAuthLoading", false);
      } catch (e) {
        console.error("[ERROR-loadUserServerInit]", e);
      }
    },

    async deleteUser(vuexContext, confirmPassword) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        const userAvatar = loadedUser.avatar;
        await vuexContext.dispatch("deletePostsByUser", userId);
        await usersRef.child(userId).remove();
        let user = firebase.auth().currentUser;
        if (user) {
          const credential = await firebase.auth.EmailAuthProvider.credential(
            user.email,
            confirmPassword
          );
          await user.reauthenticateWithCredential(credential);
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
        user = firebase.auth().currentUser;
        await user.delete();
        if (userAvatar) {
          await imageUsersRef.child(userAvatar.metadata.name).delete();
        }
        Cookie.remove("__session");
        vuexContext.commit("setUser", null);
        vuexContext.commit("setAuthLoading", false);
        reloadAll();
      } catch (e) {
        console.error("[ERROR-deleteUser]", e);
      }
    },

    async updateUserContent(vuexContext, newUserContent) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        await usersRef.child(userId).update(newUserContent);

        const user = firebase.auth().currentUser;
        if (user) {
          await user.updateProfile({
            displayName: newUserContent.fullname
          });
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
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
        reloadAll();
      } catch (e) {
        console.error("[ERROR-updateUserContent]", e);
      }
    },

    async updateUserEmail(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const loadedUser = vuexContext.getters.user;
        const userId = loadedUser.id;
        const confirmPassword = payload.confirmPassword;
        const newEmail = payload.newEmail;
        let user = firebase.auth().currentUser;
        if (user) {
          const credential = await firebase.auth.EmailAuthProvider.credential(
            user.email,
            confirmPassword
          );
          await user.reauthenticateWithCredential(credential);
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
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
        reloadAll();
      } catch (e) {
        console.error("[ERROR-updateUserEmail]", e);
      }
    },

    async updateUserPassword(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const confirmPassword = payload.confirmPassword;
        const newPassword = payload.newPassword;
        let user = firebase.auth().currentUser;
        if (user) {
          const credential = await firebase.auth.EmailAuthProvider.credential(
            user.email,
            confirmPassword
          );
          await user.reauthenticateWithCredential(credential);
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
        user = firebase.auth().currentUser; // RetrieveData
        await user.updatePassword(newPassword);
        vuexContext.commit("setAuthLoading", false);
        reloadAll();
      } catch (e) {
        console.error("[ERROR-updateUserPassword]", e);
      }
    },

    async updateUserAvatar(vuexContext, newAvatar) {
      vuexContext.commit("setAuthLoading", true);
      try {
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
          const updatedUser = {
            ...loadedUser
          };
          vuexContext.commit("setUser", updatedUser);
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
        const user = firebase.auth().currentUser;
        if (user) {
          await user.updateProfile({
            photoURL: avatarObject.url
          });
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
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
        reloadAll();
      } catch (e) {
        console.error("[ERROR-updateAvatar]", e);
      }
    },

    async isCorrectPassword(vuexContext, confirmPassword) {
      try {
        const loadedUser = vuexContext.getters.user;
        const user = firebase.auth().currentUser;
        if (user) {
          const credential = await firebase.auth.EmailAuthProvider.credential(
            loadedUser.email,
            confirmPassword
          );
          await user.reauthenticateWithCredential(credential);
        } else {
          await vuexContext.dispatch("logOut");
          return;
        }
      } catch (e) {
        console.error("[ERROR-isCorrectPassword]", e);
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
        console.error("[ERROR-isUnique]", e);
        return false;
      }
    },

    /*
     ** Begin auth actions
     */
    async signUserUp(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
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
        vuexContext.commit("setAuthLoading", false);
      } catch (e) {
        console.error("[ERROR-signUserUp]", e);
      }
    },

    async logUserIn(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      try {
        // Try to login with provided email and password to firebase
        // If wrong, the process will be thrown to catch()
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);

        // Fetch user data from realtime database
        let loadedUser = {};
        const userData = await usersRef.child(user.uid).once("value");
        const userObj = userData.val();
        loadedUser = {
          ...userObj,
          id: user.uid
        };

        // Update user data if restoring email process is finished
        if (payload.email !== userObj.email) {
          await usersRef.child(user.uid).update({
            email: payload.email,
            isActive: true
          });
          loadedUser = {
            ...loadedUser,
            email: payload.email,
            isActive: true
          };
        }

        // Update user data if verifying email process is finnished
        if (!userObj.isActive && user.emailVerified) {
          await usersRef.child(user.uid).update({
            isActive: true
          });
          loadedUser.isActive = true;
        }

        /* Start cookie */
        const token = await user.getIdToken(true);
        Cookie.set("__session", token, { expires: token ? 0.083333333 : 0 }); // 2h
        /* End cookie */

        vuexContext.commit("setUser", loadedUser);
        vuexContext.commit("setAuthLoading", false);
        reloadAll();
      } catch (e) {
        console.error("[ERROR-logUserIn]", e);
      }
    },

    async initAuth(vuexContext) {
      if (!firebase.auth().currentUser) {
        return;
      }
      if (!vuexContext.getters.user) {
        return;
      }
      const userCookie = Cookie.get("__session");
      if (!userCookie) {
        await vuexContext.dispatch("logOut");
        return;
      }
      // re-new expirationTime
      const token = await user.getIdToken(true);
      Cookie.set("__session", token, { expires: token ? 0.083333333 : 0 }); // 2h
    },

    async resetUserPassword(vuexContext, comfirmedEmail) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const auth = firebase.auth();
        await auth.sendPasswordResetEmail(comfirmedEmail);
        vuexContext.commit("setAuthLoading", false);
      } catch (e) {
        console.error("[ERROR-resetUserPassword]", e);
      }
    },

    async handleResetPassword(vuexContext, payload) {
      vuexContext.commit("setAuthLoading", true);
      try {
        const auth = firebase.auth();
        await auth.confirmPasswordReset(
          payload.actionCode,
          payload.newPassword
        );
        // user.reload()
        vuexContext.commit("setAuthLoading", false);
      } catch (e) {
        console.error("[ERROR-handleResetPassword]", e);
      }
    },

    async handleVerifyEmail(vuexContext, actionCode) {
      vuexContext.commit("setAuthLoading", true);
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
        return true;
      } catch (e) {
        console.error("[ERROR-handleVerifyEmail]", e);
        vuexContext.commit("setAuthLoading", false);
        return false;
      }
    },

    async handleRecoverEmail(vuexContext, actionCode) {
      vuexContext.commit("setAuthLoading", true);
      try {
        if (vuexContext.getters.user) {
          await vuexContext.dispatch("logOut");
          return;
        }
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
        console.error("[ERROR-handleRecoverEmail]", e);
        vuexContext.commit("setAuthLoading", false);
        return false;
      }
    },

    async logOut(vuexContext) {
      vuexContext.commit("setAuthLoading", true);
      try {
        if (process.client) {
          await firebase.auth().signOut();
          Cookie.remove("__session");
        }
        vuexContext.commit("setUser", null);
        vuexContext.commit("setAuthLoading", false);
        if (process.client) {
          reloadAll();
        }
      } catch (e) {
        console.error("[ERROR-logOut]", e);
      }
    }
    /*
     ** End auth actions
     */
  },
  getters: {
    user: state => state.user,
    authLoading: state => state.authLoading
  }
};

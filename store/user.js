import { database, storage, firebase } from "~/plugins/firebase-client-init";
import { compressImage, reloadAll } from "~/libs/helpers";
import Cookie from "js-cookie";
const usersRef = database.ref("users");
const imageUsersRef = storage.ref("users");

export const state = () => ({
  authLoading: false,
  user: null
});

export const mutations = {
  setAuthLoading(state, payload) {
    state.authLoading = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

export const actions = {
  async loadUser({ commit }, userId) {
    commit("setAuthLoading", true);
    try {
      const userData = await usersRef.child(userId).once("value");
      const userObject = userData.val();
      const loadedUser = { ...userObject, id: userId };
      commit("setAuthLoading", false);
      return loadedUser;
    } catch (e) {
      console.error("[ERROR-loadUser]", e);
    }
  },

  async loadAuthUser({ commit }, userId) {
    commit("setAuthLoading", true);
    try {
      const userData = await usersRef.child(userId).once("value");
      const userObject = userData.val();
      const loadedUser = { ...userObject, id: userId };
      commit("setUser", loadedUser);
      commit("setAuthLoading", false);
      return loadedUser;
    } catch (e) {
      console.error("[ERROR-loadAuthUser]", e);
    }
  },

  async deleteUser({ dispatch, commit, getters }, confirmPassword) {
    commit("setAuthLoading", true);
    try {
      const loadedUser = getters.user;
      const userId = loadedUser.id;
      const userAvatar = loadedUser.avatar;
      await dispatch("post/deletePostsByUser", userId, { root: true });
      await usersRef.child(userId).remove();
      let authUser = firebase.auth().currentUser;
      if (authUser) {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );
        await authUser.reauthenticateWithCredential(credential);
      } else {
        await dispatch("logOut");
        return;
      }
      authUser = firebase.auth().currentUser;
      await authUser.delete();
      if (userAvatar) {
        await imageUsersRef.child(userAvatar.metadata.name).delete();
      }
      Cookie.remove("__session");
      commit("setUser", null);
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-deleteUser]", e);
    }
  },

  async updateUserContent({ dispatch, commit, getters }, newUserContent) {
    commit("setAuthLoading", true);
    try {
      const loadedUser = getters.user;
      const userId = loadedUser.id;
      await usersRef.child(userId).update(newUserContent);

      const authUser = firebase.auth().currentUser;
      if (authUser) {
        await authUser.updateProfile({
          displayName: newUserContent.fullname
        });
      } else {
        await dispatch("logOut");
        return;
      }
      if (newUserContent.username !== loadedUser.username) {
        await dispatch(
          "post/updatePostsByUser",
          {
            username: newUserContent.username
          },
          { root: true }
        );
      }
      commit("setUser", {
        ...loadedUser,
        ...newUserContent
      });
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-updateUserContent]", e);
    }
  },

  async updateUserEmail({ dispatch, commit, getters }, payload) {
    commit("setAuthLoading", true);
    try {
      const loadedUser = getters.user;
      const userId = loadedUser.id;
      const confirmPassword = payload.confirmPassword;
      const newEmail = payload.newEmail;
      let authUser = firebase.auth().currentUser;
      if (authUser) {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          authUser.email,
          confirmPassword
        );
        await authUser.reauthenticateWithCredential(credential);
      } else {
        await dispatch("logOut");
        return;
      }
      authUser = firebase.auth().currentUser; // RetrieveData
      await authUser.updateEmail(newEmail);
      await authUser.sendEmailVerification();
      await usersRef.child(userId).update({
        isActive: false,
        email: newEmail
      });
      commit("setUser", {
        ...loadedUser,
        isActive: false,
        email: newEmail
      });
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-updateUserEmail]", e);
    }
  },

  async updateUserPassword({ dispatch, commit }, payload) {
    commit("setAuthLoading", true);
    try {
      const confirmPassword = payload.confirmPassword;
      const newPassword = payload.newPassword;
      let authUser = firebase.auth().currentUser;
      if (authUser) {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          authUser.email,
          confirmPassword
        );
        await authUser.reauthenticateWithCredential(credential);
      } else {
        await dispatch("logOut");
        return;
      }
      authUser = firebase.auth().currentUser; // RetrieveData
      await authUser.updatePassword(newPassword);
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-updateUserPassword]", e);
    }
  },

  async updateUserAvatar({ dispatch, commit, getters }, newAvatar) {
    commit("setAuthLoading", true);
    try {
      const loadedUser = getters.user;
      const userId = loadedUser.id;
      const oldAvatar = loadedUser.avatar;
      if (oldAvatar) {
        await imageUsersRef.child(oldAvatar.metadata.name).delete();
      }
      if (!newAvatar) {
        await usersRef.child(userId).update({
          avatar: null
        });
        await dispatch(
          "post/updatePostsByUser",
          {
            avatar: null
          },
          { root: true }
        );
        delete loadedUser.avatar;
        const updatedUser = {
          ...loadedUser
        };
        commit("setUser", updatedUser);
        commit("setAuthLoading", false);
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
      await imageUsersRef.child(newAvatarName).put(cprAvatar, storageMetadata);
      const avatarDownloadUrl = await imageUsersRef
        .child(newAvatarName)
        .getDownloadURL();
      avatarObject = {
        metadata: metaData,
        url: avatarDownloadUrl
      };
      const authUser = firebase.auth().currentUser;
      if (authUser) {
        await authUser.updateProfile({
          photoURL: avatarObject.url
        });
      } else {
        await dispatch("logOut");
        return;
      }
      await usersRef.child(userId).update({
        avatar: avatarObject
      });
      await dispatch(
        "post/updatePostsByUser",
        {
          avatar: avatarObject
        },
        { root: true }
      );
      const updatedUser = {
        ...loadedUser,
        avatar: avatarObject
      };
      commit("setUser", updatedUser);
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-updateAvatar]", e);
    }
  },

  async isCorrectPassword({ dispatch, getters }, confirmPassword) {
    try {
      const loadedUser = getters.user;
      const authUser = firebase.auth().currentUser;
      if (authUser) {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          loadedUser.email,
          confirmPassword
        );
        await authUser.reauthenticateWithCredential(credential);
      } else {
        await dispatch("logOut");
        return;
      }
    } catch (e) {
      console.error("[ERROR-isCorrectPassword]", e);
    }
  },

  async isUnique({ dispatch, commit, getters }, payload) {
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
  async signUserUp({ commit }, payload) {
    commit("setAuthLoading", true);
    try {
      const auth = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);
      const authUser = auth.user;
      await authUser.updateProfile({
        displayName: payload.username
      });
      await authUser.sendEmailVerification();
      const userProfile = {
        username: payload.username,
        email: payload.email,
        isActive: false,
        updatedDate: new Date().toISOString()
      };
      const userId = authUser.uid;
      await usersRef.child(userId).set(userProfile);
      commit("setAuthLoading", false);
    } catch (e) {
      console.error("[ERROR-signUserUp]", e);
    }
  },

  async logUserIn({ commit }, payload) {
    commit("setAuthLoading", true);
    try {
      // Try to login with provided email and password to firebase
      // If wrong, the process will be thrown to catch()
      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      const authUser = auth.user;
      // Fetch user data from realtime database
      const userId = authUser.uid;
      let loadedUser = {};
      const userData = await usersRef.child(userId).once("value");
      const userObj = userData.val();
      loadedUser = {
        ...userObj,
        id: userId
      };

      // Update user data if restoring email process is finished
      if (payload.email !== userObj.email) {
        await usersRef.child(userId).update({
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
      if (!userObj.isActive && authUser.emailVerified) {
        await usersRef.child(userId).update({
          isActive: true
        });
        loadedUser.isActive = true;
      }

      /* Start cookie */
      const token = await authUser.getIdToken(true);
      Cookie.set("__session", token, { expires: token ? 0.083333333 : 0 }); // 2h
      /* End cookie */

      commit("setUser", loadedUser);
      commit("setAuthLoading", false);
      reloadAll();
    } catch (e) {
      console.error("[ERROR-logUserIn]", e);
    }
  },

  async initAuth({ dispatch, getters }) {
    const authUser = firebase.auth().currentUser;
    if (!authUser) {
      return;
    }
    if (!getters.user) {
      return;
    }
    const userCookie = Cookie.get("__session");
    if (!userCookie) {
      await dispatch("logOut");
      return;
    }
    // re-new expirationTime
    const token = await authUser.getIdToken(true);
    Cookie.set("__session", token, { expires: token ? 0.083333333 : 0 }); // 2h
  },

  async resetUserPassword({ commit }, comfirmedEmail) {
    commit("setAuthLoading", true);
    try {
      const auth = firebase.auth();
      await auth.sendPasswordResetEmail(comfirmedEmail);
      commit("setAuthLoading", false);
    } catch (e) {
      console.error("[ERROR-resetUserPassword]", e);
    }
  },

  async handleResetPassword({ commit }, payload) {
    commit("setAuthLoading", true);
    try {
      const auth = firebase.auth();
      await auth.confirmPasswordReset(payload.actionCode, payload.newPassword);
      // user.reload()
      commit("setAuthLoading", false);
    } catch (e) {
      console.error("[ERROR-handleResetPassword]", e);
    }
  },

  async handleVerifyEmail({ commit, getters }, actionCode) {
    commit("setAuthLoading", true);
    try {
      const auth = firebase.auth();
      await auth.applyActionCode(actionCode);
      // user.reload()
      const loadedUser = getters.user;
      if (loadedUser) {
        const userId = loadedUser.id;
        await usersRef.child(userId).update({
          isActive: true
        });
        commit("setUser", {
          ...loadedUser,
          isActive: true
        });
      }
      commit("setAuthLoading", false);
      return true;
    } catch (e) {
      console.error("[ERROR-handleVerifyEmail]", e);
      commit("setAuthLoading", false);
      return false;
    }
  },

  async handleRecoverEmail({ dispatch, commit, getters }, actionCode) {
    commit("setAuthLoading", true);
    try {
      if (getters.user) {
        await dispatch("logOut");
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

      commit("setAuthLoading", false);
      return true;
    } catch (e) {
      console.error("[ERROR-handleRecoverEmail]", e);
      commit("setAuthLoading", false);
      return false;
    }
  },

  async logOut({ commit }) {
    commit("setAuthLoading", true);
    try {
      if (process.client) {
        await firebase.auth().signOut();
        Cookie.remove("__session");
      }
      commit("setUser", null);
      commit("setAuthLoading", false);
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
};

export const getters = {
  user: state => state.user,
  authLoading: state => state.authLoading
};

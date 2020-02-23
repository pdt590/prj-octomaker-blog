import firebase from "~/libs/firebase";
const db = firebase.database();
const postsRef = db.ref("posts");

export default {
  state: () => ({
    queryLoading: false
  }),
  mutations: {
    setQueryLoading(state, payload) {
      state.queryLoading = payload;
    }
  },
  actions: {
    // Lazy Posts
    async loadLazyPosts(vuexContext, payload) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const maxPosts = payload.limit;
        let postsData = [];
        let loadedPosts = [];
        let count = 0;
        while (loadedPosts.length < maxPosts) {
          // Try to load 3 times
          if (count == 3) {
            break;
          }
          count++;
          loadedPosts = [];
          if (payload.endAtKey !== undefined) {
            postsData = await postsRef
              .orderByChild("updatedDate")
              .endAt(payload.endAtKey)
              .limitToLast(maxPosts * count)
              .once("value");
          } else {
            postsData = await postsRef
              .orderByChild("updatedDate")
              .limitToLast(maxPosts * count)
              .once("value");
          }
          postsData.forEach(postData => {
            const postObj = postData.val();
            if (postObj.mode === "public") {
              loadedPosts.push(postObj);
            }
          });
        }
        loadedPosts.reverse();
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts;
      } catch (e) {
        console.error("[ERROR-loadLazyPosts]", e);
      }
    },

    // Personal Posts
    async loadPersonalPosts(vuexContext, creatorId) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const postsData = await postsRef
          .orderByChild("creator/id")
          .equalTo(creatorId)
          .once("value");
        const loadedPosts = [];
        postsData.forEach(postData => {
          const postObj = postData.val();
          if (postObj.mode === "public") {
            loadedPosts.push(postObj);
          }
        });
        loadedPosts.reverse();
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts;
      } catch (e) {
        console.error("[ERROR-loadPersonalPosts]", e);
      }
    },

    // Recommended Posts
    async loadRecommendedPosts(vuexContext, payload) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
        const maxPosts = payload.limit;
        const creatorId = payload.creatorId;
        let loadedPosts = [];
        let count = 0;
        while (loadedPosts.length < maxPosts) {
          // Try to load 3 times
          if (count == 3) {
            break;
          }
          count++;
          loadedPosts = [];
          const postsData = await postsRef
            .orderByChild("creator/id")
            .equalTo(creatorId)
            .limitToLast(maxPosts * count)
            .once("value");
          postsData.forEach(postData => {
            const postObj = postData.val();
            if (postObj.mode === "public" && postObj.url !== loadedPost.url) {
              loadedPosts.push(postObj);
            }
          });
        }
        loadedPosts.reverse();
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts;
      } catch (e) {
        console.error("[ERROR-loadRecommendedPosts]", e);
      }
    },

    // Categorized Posts
    async loadCategorizedPosts(vuexContext, category) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const postsData = await postsRef
          .orderByChild("category")
          .equalTo(category)
          .limitToLast(300)
          .once("value");
        const loadedPosts = [];
        postsData.forEach(postData => {
          const postObj = postData.val();
          if (postObj.mode === "public") {
            loadedPosts.push(postObj);
          }
        });
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts.reverse();
      } catch (e) {
        console.error("[ERROR-loadCategorizedPosts]", e);
      }
    },

    // Own Posts
    async loadOwnPosts(vuexContext) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const userId = vuexContext.getters.user.id;
        const postsData = await postsRef
          .orderByChild("creator/id")
          .equalTo(userId)
          .once("value");
        const loadedPosts = [];
        postsData.forEach(postData => {
          const postObj = postData.val();
          loadedPosts.push(postObj);
        });
        loadedPosts.reverse();
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts;
      } catch (e) {
        console.error("[ERROR-loadOwnPosts]", e);
      }
    },

    // Searched Posts
    async loadSearchPosts(vuexContext, searchKey) {
      vuexContext.commit("setQueryLoading", true);
      try {
        const postsData = await postsRef
          .orderByChild("title")
          .startAt(searchKey)
          .endAt(searchKey + "\uf8ff")
          .limitToLast(300)
          .once("value");
        const loadedPosts = [];
        postsData.forEach(postData => {
          const postObj = postData.val();
          if (postObj.mode === "public") {
            loadedPosts.push(postObj);
          }
        });
        vuexContext.commit("setQueryLoading", false);
        return loadedPosts.reverse();
      } catch (e) {
        console.error("[ERROR-loadSearchPosts]", e);
      }
    }
  },
  getters: {
    queryLoading(state) {
      return state.queryLoading;
    }
  }
};

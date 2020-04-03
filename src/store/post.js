import { database, storage } from "~/plugins/firebase-client-init";
import { genId, genUrl, fetchId, compressImage } from "~/libs/helpers";
const postsRef = database.ref("posts");
const imagesPostRef = storage.ref("posts");

export const state = () => ({
  postLoading: false,
  loadedPost: null
});

export const mutations = {
  setPostLoading(state, payload) {
    state.postLoading = payload;
  },
  setPost(state, payload) {
    state.loadedPost = payload;
  }
};

export const actions = {
  async addPostTitle({ commit, rootGetters }, postTitle) {
    commit("setPostLoading", true);
    try {
      const user = rootGetters["user/user"]
      const postId = genId(5);
      const postUrl = genUrl(postTitle, postId);
      const creator = {
        id: user.id,
        username: user.username,
        avatar: user.avatar
          ? user.avatar
          : null
      };
      const postContent = {
        category: "iot",
        tags: ["code"],
        mode: "private",
        markdown: "",
        html: ""
      };

      const post = {
        title: postTitle,
        url: postUrl,
        ...postContent,
        creator: creator,
        updatedDate: new Date().toISOString()
      };
      await postsRef.child(postId).set(post);
      commit("setPost", post);
      commit("setPostLoading", false);
      return postUrl;
    } catch (e) {
      console.error("[ERROR-addPostTitle]", e);
    }
  },

  async updatePostTitle({ commit, getters }, newPostTitle) {
    commit("setPostLoading", true);
    try {
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);
      const newPostUrl = genUrl(newPostTitle, postId);
      const update = {
        title: newPostTitle,
        url: newPostUrl
      };
      await postsRef.child(postId).update(update);
      commit("setPost", {
        ...loadedPost,
        ...update
      });
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-updatePostTitle]", e);
    }
  },

  async addPostImage({ commit, getters, rootGetters }, images) {
    commit("setPostLoading", true);
    try {
      const user = rootGetters["user/user"]
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);

      const uploadedImages = [];
      const storageMetadata = {
        cacheControl: "public,max-age=31536000"
      };
      if (!images.length) {
        commit("setPostLoading", false);
        return uploadedImages;
      }
      for (const image of images) {
        const ext = image.name.slice(image.name.lastIndexOf("."));
        const newImageName = `${postId}_${genId(3)}${ext}`;
        const metaData = {
          name: newImageName,
          orgName: image.name,
          size: image.size,
          creator: user.id
        };
        await imagesPostRef.child(newImageName).put(image, storageMetadata);
        const imgDownloadUrl = await imagesPostRef
          .child(newImageName)
          .getDownloadURL();
        uploadedImages.push({
          url: imgDownloadUrl,
          metadata: metaData
        });
      }
      if (!uploadedImages.length) {
        commit("setPostLoading", false);
        return uploadedImages;
      }
      const loadedImages = loadedPost.images;
      let update = {};
      loadedImages
        ? (update = {
            images: [...uploadedImages, ...loadedImages]
          })
        : (update = {
            images: [...uploadedImages]
          });
      await postsRef.child(postId).update(update);
      commit("setPost", {
        ...loadedPost,
        ...update
      });
      commit("setPostLoading", false);
      return uploadedImages;
    } catch (e) {
      console.error("[ERROR-addPostImage]", e);
    }
  },

  async addCompressedPostImage({ commit, getters, rootGetters }, images) {
    commit("setPostLoading", true);
    try {
      const user = rootGetters["user/user"]
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);

      const uploadedImages = [];
      const storageMetadata = {
        cacheControl: "public,max-age=31536000"
      };
      for (const image of images) {
        const cprImage = await compressImage(image);
        const ext = cprImage.name.slice(cprImage.name.lastIndexOf("."));
        const newImageName = `${postId}_${genId(3)}${ext}`;
        const metaData = {
          name: newImageName,
          orgName: cprImage.name,
          size: cprImage.size,
          creator: user.id
        };
        await imagesPostRef.child(newImageName).put(cprImage, storageMetadata);
        const imgDownloadUrl = await imagesPostRef
          .child(newImageName)
          .getDownloadURL();
        uploadedImages.push({
          url: imgDownloadUrl,
          metadata: metaData
        });
      }
      if (!uploadedImages.length) {
        commit("setPostLoading", false);
        return uploadedImages;
      }
      const loadedImages = loadedPost.images;
      let update = {};
      loadedImages
        ? (update = {
            images: [...uploadedImages, ...loadedImages]
          })
        : (update = {
            images: [...uploadedImages]
          });
      await postsRef.child(postId).update(update);
      commit("setPost", {
        ...loadedPost,
        ...update
      });
      commit("setPostLoading", false);
      return uploadedImages;
    } catch (e) {
      console.error("[ERROR-addCompressedPostImage]", e);
    }
  },

  async deletePostImage({ commit, getters }, image) {
    commit("setPostLoading", true);
    try {
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);
      const loadedImages = loadedPost.images;
      const removedImageIndex = loadedImages.findIndex(
        item => item.url === image.url
      );
      loadedImages.splice(removedImageIndex, 1);
      await imagesPostRef.child(image.metadata.name).delete();

      const update = {
        images: loadedImages
      };
      await postsRef.child(postId).update(update);
      commit("setPost", {
        ...loadedPost,
        ...update
      });
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-deletePostImage]", e);
    }
  },

  async addPostContent({ commit, getters }, postContent) {
    commit("setPostLoading", true);
    try {
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);
      await postsRef.child(postId).update(postContent);
      commit("setPost", {
        ...loadedPost,
        ...postContent
      });
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-addPostContent]", e);
    }
  },

  async loadPost({ commit }, postUrl) {
    commit("setPostLoading", true);
    try {
      const postId = fetchId(postUrl);
      const postData = await postsRef.child(postId).once("value");
      const postObj = postData.val();
      const loadedPost = postObj;
      commit("setPost", loadedPost);
      commit("setPostLoading", false);
      return loadedPost;
    } catch (e) {
      console.error("[ERROR-loadPost]", e);
    }
  },

  async deletePost({ commit, getters }) {
    commit("setPostLoading", true);
    try {
      const loadedPost = getters.loadedPost;
      const postId = fetchId(loadedPost.url);
      const postImages = loadedPost.images;
      if (postImages) {
        await Promise.all(
          postImages.map(async image => {
            await imagesPostRef.child(image.metadata.name).delete();
          })
        );
      }

      await postsRef.child(postId).remove();
      commit("setPost", null);
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-deletePost]", e);
    }
  },

  /**
   * Actions called by user
   */
  async updatePostsByUser({ commit, rootGetters }, updatedUser) {
    commit("setPostLoading", true);
    try {
      const user = rootGetters["user/user"];
      const userId = user.id;
      const postsData = await postsRef
        .orderByChild("creator/id")
        .equalTo(userId)
        .once("value");
      let updates = {};
      postsData.forEach(postData => {
        if (updatedUser.username !== undefined) {
          updates[`${postData.key}/creator/username`] = updatedUser.username;
        }
        if (updatedUser.avatar !== undefined) {
          updates[`${postData.key}/creator/avatar`] = updatedUser.avatar;
        }
      });
      // TODO Update current loadedPost
      await postsRef.update(updates);
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-updatePostsByUser]", e);
    }
  },

  async deletePostsByUser({ commit }, userId) {
    commit("setPostLoading", true);
    try {
      const postsData = await postsRef
        .orderByChild("creator/id")
        .equalTo(userId)
        .once("value");
      const updates = {};
      const postsObj = postsData.val();
      if (!postsObj) {
        commit("setPostLoading", false);
        return;
      }
      Object.keys(postsObj).forEach(async key => {
        updates[key] = null;
        const post = postsObj[key];
        const postImages = post.images;
        if (postImages) {
          await Promise.all(
            postImages.map(async image => {
              await imagesPostRef.child(image.metadata.name).delete();
            })
          );
        }
      });
      await postsRef.update(updates);
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-deletePostsByUser]", e);
    }
  },

  async deletePostByUser({ commit }, postUrl) {
    commit("setPostLoading", true);
    try {
      const postId = fetchId(postUrl);
      const postData = await postsRef.child(postId).once("value");
      const loadedPost = postData.val();
      const postImages = loadedPost.images;
      if (postImages) {
        await Promise.all(
          postImages.map(async image => {
            await imagesPostRef.child(image.metadata.name).delete();
          })
        );
      }

      await postsRef.child(postId).remove();
      commit("setPostLoading", false);
    } catch (e) {
      console.error("[ERROR-deletePostByUser]", e);
    }
  }
};

export const getters = {
  postLoading: state => state.postLoading,
  loadedPost: state => state.loadedPost
};

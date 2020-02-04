import firebase from "~/libs/firebase";
import { genId, genUrl, fetchId, compressImage } from "~/libs/helpers";
const database = firebase.database();
const storage = firebase.storage();
const postsRef = database.ref("posts");
const imagesPostRef = storage.ref("posts");

export default {
  state: {
    titleLoading: false,
    postLoading: false,
    loadedPost: null
  },
  mutations: {
    setTitleLoading(state, payload) {
      state.titleLoading = payload;
    },
    setPostLoading(state, payload) {
      state.postLoading = payload;
    },
    setPost(state, payload) {
      state.loadedPost = payload;
    }
  },
  actions: {
    async addPostTitle(vuexContext, postTitle) {
      vuexContext.commit("setTitleLoading", true);
      try {
        const postId = genId(5);
        const postUrl = genUrl(postTitle, postId);
        const creator = {
          id: vuexContext.getters.user.id,
          username: vuexContext.getters.user.username,
          avatar: vuexContext.getters.user.avatar
            ? vuexContext.getters.user.avatar
            : null
        };
        const postContent = {
          category: "others",
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
        vuexContext.commit("setPost", post);
        vuexContext.commit("setTitleLoading", false);
        return postUrl;
      } catch (e) {
        console.error("[ERROR-addPostTitle]", e);
      }
    },

    async updatePostTitle(vuexContext, newPostTitle) {
      vuexContext.commit("setTitleLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
        const postId = fetchId(loadedPost.url);
        const newPostUrl = genUrl(newPostTitle, postId);
        const update = {
          title: newPostTitle,
          url: newPostUrl
        };
        await postsRef.child(postId).update(update);
        vuexContext.commit("setPost", {
          ...loadedPost,
          ...update
        });
        vuexContext.commit("setTitleLoading", false);
      } catch (e) {
        console.error("[ERROR-updatePostTitle]", e);
      }
    },

    async addPostImage(vuexContext, images) {
      vuexContext.commit("setPostLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
        const postId = fetchId(loadedPost.url);

        const uploadedImages = [];
        const storageMetadata = {
          cacheControl: "public,max-age=31536000"
        };
        if (!images.length) {
          vuexContext.commit("setPostLoading", false);
          return uploadedImages;
        }
        for (const image of images) {
          const ext = image.name.slice(image.name.lastIndexOf("."));
          const newImageName = `${postId}_${genId(3)}${ext}`;
          const metaData = {
            name: newImageName,
            orgName: image.name,
            size: image.size,
            creator: vuexContext.getters.user.id
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
        const loadedImages = loadedPost.images;
        let update = {};
        loadedImages
          ? (update = {
              images: [...loadedImages, ...uploadedImages]
            })
          : (update = {
              images: [...uploadedImages]
            });
        await postsRef.child(postId).update(update);
        vuexContext.commit("setPost", {
          ...loadedPost,
          ...update
        });
        vuexContext.commit("setPostLoading", false);
        return uploadedImages;
      } catch (e) {
        console.error("[ERROR-addPostImage]", e);
      }
    },

    async addCompressedPostImage(vuexContext, images) {
      vuexContext.commit("setPostLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
        const postId = fetchId(loadedPost.url);

        const uploadedImages = [];
        const storageMetadata = {
          cacheControl: "public,max-age=31536000"
        };
        for (const image of images) {
          const cprImage = await compressImage(image);
          if (!cprImage) {
            continue;
          }
          const ext = cprImage.name.slice(cprImage.name.lastIndexOf("."));
          const newImageName = `${postId}_${genId(3)}${ext}`;
          const metaData = {
            name: newImageName,
            orgName: cprImage.name,
            size: cprImage.size,
            creator: vuexContext.getters.user.id
          };
          await imagesPostRef
            .child(newImageName)
            .put(cprImage, storageMetadata);
          const imgDownloadUrl = await imagesPostRef
            .child(newImageName)
            .getDownloadURL();
          uploadedImages.push({
            url: imgDownloadUrl,
            metadata: metaData
          });
        }
        if (!uploadedImages.length) {
          vuexContext.commit("setPostLoading", false);
          return uploadedImages;
        }
        const loadedImages = loadedPost.images;
        let update = {};
        loadedImages
          ? (update = {
              images: [...loadedImages, ...uploadedImages]
            })
          : (update = {
              images: [...uploadedImages]
            });
        await postsRef.child(postId).update(update);
        vuexContext.commit("setPost", {
          ...loadedPost,
          ...update
        });
        vuexContext.commit("setPostLoading", false);
        return uploadedImages;
      } catch (e) {
        console.error("[ERROR-addCompressedPostImage]", e);
      }
    },

    async deletePostImage(vuexContext, image) {
      vuexContext.commit("setPostLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
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
        vuexContext.commit("setPost", {
          ...loadedPost,
          ...update
        });
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-deletePostImage]", e);
      }
    },

    async addPostContent(vuexContext, postContent) {
      vuexContext.commit("setPostLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
        const postId = fetchId(loadedPost.url);
        await postsRef.child(postId).update(postContent);
        vuexContext.commit("setPost", {
          ...loadedPost,
          ...postContent
        });
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-addPostContent]", e);
      }
    },

    async loadPost(vuexContext, postUrl) {
      vuexContext.commit("setPostLoading", true);
      try {
        const postId = fetchId(postUrl);
        const postData = await postsRef.child(postId).once("value");
        const postObj = postData.val();
        const loadedPost = postObj;
        vuexContext.commit("setPost", loadedPost);
        vuexContext.commit("setPostLoading", false);
        return loadedPost;
      } catch (e) {
        console.error("[ERROR-loadPost]", e);
      }
    },

    async deletePost(vuexContext) {
      vuexContext.commit("setPostLoading", true);
      try {
        const loadedPost = vuexContext.getters.loadedPost;
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
        vuexContext.commit("setPost", null);
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-deletePost]", e);
      }
    },

    /**
     * Actions called by user
     */
    async updatePostsByUser(vuexContext, updatedUser) {
      vuexContext.commit("setPostLoading", true);
      try {
        const user = vuexContext.getters.user;
        const userId = user.id;
        const postsData = await postsRef
          .orderByChild("creator/id")
          .equalTo(userId)
          .once("value");
        let updates = {};
        postsData.forEach(postData => {
          updatedUser.username !== undefined
            ? (updates[`${postData.key}/creator/username`] =
                updatedUser.username)
            : ``;
          updatedUser.avatar !== undefined
            ? (updates[`${postData.key}/creator/avatar`] = updatedUser.avatar)
            : ``;
        });
        await postsRef.update(updates);
        //vuexContext.commit('setPost', ) // TODO how to update current loadedPost
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-updatePostsByUser]", e);
      }
    },

    async deletePostsByUser(vuexContext, userId) {
      vuexContext.commit("setPostLoading", true);
      try {
        const postsData = await postsRef
          .orderByChild("creator/id")
          .equalTo(userId)
          .once("value");
        const updates = {};
        const postsObj = postsData.val();
        if (!postsObj) {
          vuexContext.commit("setPostLoading", false);
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
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-deletePostsByUser]", e);
      }
    },

    async deletePostByUser(vuexContext, postUrl) {
      vuexContext.commit("setPostLoading", true);
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
        vuexContext.commit("setPostLoading", false);
      } catch (e) {
        console.error("[ERROR-deletePostByUser]", e);
      }
    }
  },
  getters: {
    titleLoading(state) {
      return state.titleLoading;
    },
    postLoading(state) {
      return state.postLoading;
    },
    loadedPost(state) {
      return state.loadedPost;
    }
  }
};

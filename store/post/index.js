import firebase from '~/plugins/plugin-firebase'
import { genId, genUrl, fetchId, compressImage } from '~/plugins/util-helpers'
const database = firebase.database()
const storage = firebase.storage()
const postsRef = database.ref('posts')
const imagesPostRef = storage.ref('posts')

export default {
  state: {
    postLoading: false,
    loadedPost: null
  },
  mutations: {
    setPostLoading(state, payload) {
      state.postLoading = payload
    },
    setPost(state, payload) {
      state.loadedPost = payload
    }
  },
  actions: {
    async addPostTitle(vuexContext, postTitle) {
      vuexContext.commit('setPostLoading', true)
      try {
        const postId = genId(5)
        const postUrl = genUrl(postTitle, postId)
        const _creator = {
          id: vuexContext.getters.user.id,
          username: vuexContext.getters.user.username,
          avatar: vuexContext.getters.user.avatar ? vuexContext.getters.user.avatar : null
        }

        const post = {
          title: postTitle,
          url: postUrl,
          _creator: _creator,
          updatedDate: new Date().toISOString()
        }
        await postsRef.child(postId).set(post)
        vuexContext.commit('setPost', post)
        vuexContext.commit('setPostLoading', false)
        return postUrl
      } catch (e) {
        console.log('[ERROR-addPostTitle]', e)
      }
    },

    async updatePostTitle(vuexContext, newPostTitle) {
      vuexContext.commit('setPostLoading', true)
      try {
        const loadedPost = vuexContext.getters.loadedPost
        const postId = fetchId(loadedPost.url)
        const newPostUrl = genUrl(newPostTitle, postId)
        const update = {
          title: newPostTitle,
          url: newPostUrl
        }
        await postsRef.child(postId).update(update)
        vuexContext.commit('setPost', {
          ...loadedPost,
          ...update
        })
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-updatePostTitle]', e)
      }
    },

    async addPostImage(vuexContext, image) {
      vuexContext.commit('setPostLoading', true)
      try {
        const loadedPost = vuexContext.getters.loadedPost
        const postId = fetchId(loadedPost.url)

        const storageMetadata = {
          cacheControl: 'public,max-age=31536000',
        }
        const cprImage = await compressImage(image)
        const ext = cprImage.name.slice(cprImage.name.lastIndexOf('.'))
        const newImageName = `${postId}_${genId(3)}${ext}`
        const metaData = {
          name: newImageName,
          size: cprImage.size,
          _name: cprImage.name,
          _creator: vuexContext.getters.user.id
        }
        await imagesPostRef.child(newImageName).put(cprImage, storageMetadata)
        const imgDownloadUrl = await imagesPostRef.child(newImageName).getDownloadURL()
        const uploadedImage = {
          url: imgDownloadUrl,
          metadata: metaData
        }
        const loadedImages = loadedPost.images
        let update = {}
        loadedImages ?
          update = {
            images: [...loadedImages, uploadedImage]
          }
          :
          update = {
            images: [uploadedImage]
          }

        await postsRef.child(postId).update(update)
        vuexContext.commit('setPost', {
          ...loadedPost,
          ...update
        })
        vuexContext.commit('setPostLoading', false)
        return uploadedImage
      } catch (e) {
        console.log('[ERROR-addPostImage]', e)
      }
    },

    async deletePostImage(vuexContext, image) {
      vuexContext.commit('setPostLoading', true)
      try {
        const loadedPost = vuexContext.getters.loadedPost
        const postId = fetchId(loadedPost.url)
        const loadedImages = loadedPost.images
        const removedImageIndex = loadedImages.findIndex(item => item.url === image.url)
        loadedImages.splice(removedImageIndex, 1)
        await imagesPostRef.child(image.metadata.name).delete()

        const update = {
          images: loadedImages
        }
        await postsRef.child(postId).update(update)
        vuexContext.commit('setPost', {
          ...loadedPost,
          ...update
        })
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-deletePostImage]', e)
      }
    },

    async addPostContent(vuexContext, postContent) {
      vuexContext.commit('setPostLoading', true)
      try {
        const loadedPost = vuexContext.getters.loadedPost     
        const postId = fetchId(loadedPost.url)
        await postsRef.child(postId).update(postContent)
        vuexContext.commit('setPost', {
          ...loadedPost,
          ...postContent
        })
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-addPostContent]', e)
      }
    },

    async loadPost(vuexContext, postUrl) {
      vuexContext.commit('setPostLoading', true)
      try {
        const postId = fetchId(postUrl)
        const postData = await postsRef.child(postId).once('value')
        const postObj = postData.val()
        const loadedPost = postObj
        vuexContext.commit('setPost', loadedPost)
        vuexContext.commit('setPostLoading', false)
        return loadedPost
      } catch (e) {
        console.log('[ERROR-loadPost]', e)
      }
    },

    async deletePost(vuexContext) {
      vuexContext.commit('setPostLoading', true)
      try {
        const loadedPost = vuexContext.getters.loadedPost
        const postId = fetchId(loadedPost.url)
        if (loadedPost.images) {
          await Promise.all(loadedPost.images.map(async (image) => {
            await imagesPostRef.child(image.metadata.name).delete()
          }))
        }

        await postsRef.child(postId).remove()
        vuexContext.commit('setPost', null)
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-deletePost]', e)
      }
    },

    /**
     * Actions called by user
     */
    async updatePostsByUser(vuexContext, updatedUser) {
      vuexContext.commit('setPostLoading', true)
      try {
        const user = vuexContext.getters.user
        const userId = user.id
        const postsData = await postsRef.orderByChild('_creator/id').equalTo(userId).once('value')
        let updates = {}
        postsData.forEach(postData => {
          updatedUser.username !== undefined ? updates[`${postData.key}/_creator/username`] = updatedUser.username : ``
          updatedUser.avatar !== undefined ? updates[`${postData.key}/_creator/avatar`] = updatedUser.avatar : ``
        })
        await postsRef.update(updates)
        //vuexContext.commit('setPost', ) // TODO how to update current loadedPost
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-updatePostsByUser]', e)
      }
    },

    async deletePostsByUser(vuexContext, userId) {
      vuexContext.commit('setPostLoading', true)
      try {
        const postsData = await postsRef.orderByChild('_creator/id').equalTo(userId).once('value')
        const updates = {}
        const postsObj = postsData.val()
        if (!postsObj) {
          vuexContext.commit('setPostLoading', false)
          return
        }
        Object.keys(postsObj).forEach(async (key) => {
          updates[key] = null
          const post = postsObj[key]
          if (post.images) {
            await Promise.all(post.images.map(async (image) => {
              await imagesPostRef.child(image.metadata.name).delete()
            }))
          }
        })
        await postsRef.update(updates)
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-deletePostsByUser]', e)
      }
    },

    async deletePostByUser(vuexContext, postUrl) {
      vuexContext.commit('setPostLoading', true)
      try {
        const postId = fetchId(postUrl)
        const postData = await postsRef.child(postId).once('value')
        const loadedPost = postData.val()
        if (loadedPost.images) {
          await Promise.all(loadedPost.images.map(async (image) => {
            await imagesPostRef.child(image.metadata.name).delete()
          }))
        }

        await postsRef.child(postId).remove()
        vuexContext.commit('setPostLoading', false)
      } catch (e) {
        console.log('[ERROR-deletePostByUser]', e)
      }
    }
  },
  getters: {
    postLoading(state) {
      return state.postLoading
    },
    loadedPost(state) {
      return state.loadedPost
    }
  }
}
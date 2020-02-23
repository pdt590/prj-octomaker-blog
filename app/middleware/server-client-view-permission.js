export default async function({ app, store, params, redirect }) {
  const user = store.getters.user;
  if (!store.getters.loadedPost) {
    // for Server side
    await store.dispatch("loadPost", params.postUrl);
  }
  const loadedPost = store.getters.loadedPost;
  if (user) {
    if (loadedPost.creator.id !== user.id) {
      if (loadedPost.mode === "private") {
        redirect(app.localePath('/'));
      }
    }
  } else {
    if (loadedPost.mode === "private") {
      redirect(app.localePath('/'));
    }
  }
}

export default async function({ app, store, params, redirect }) {
  const user = store.getters["user/user"];
  if (!store.getters["post/loadedPost"]) {
    // for Server side
    await store.dispatch("post/loadPost", params.postUrl);
  }
  const loadedPost = store.getters["post/loadedPost"];
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

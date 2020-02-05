export default async function({ store, params, redirect }) {
  const user = store.getters.user;
  if (!store.getters.loadedPost) {
    // for Server side
    await store.dispatch("loadPost", params.postUrl);
  }
  const loadedPost = store.getters.loadedPost;
  if (user) {
    if (loadedPost.creator.id !== user.id) {
      if (loadedPost.mode === "private") {
        redirect("/");
      }
    }
  } else {
    if (loadedPost.mode === "private") {
      redirect("/");
    }
  }
}

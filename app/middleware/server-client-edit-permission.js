export default async function({ app, store, params, redirect }) {
  const user = store.getters.user;
  if (!store.getters.loadedPost) {
    // for Server side
    await store.dispatch("loadPost", params.postUrl);
  }
  const loadedPost = store.getters.loadedPost;
  if (loadedPost.creator.id !== user.id) {
    redirect(app.localePath('/user/join'));
    //redirect(`/${app.i18n.defaultLocale}/user/join'`);
  }
}
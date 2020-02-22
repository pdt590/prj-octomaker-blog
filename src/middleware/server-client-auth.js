export default function({ app, store, redirect }) {
  const user = store.getters.user;
  !user ? redirect(app.localePath('/user/join')) : ``;
}
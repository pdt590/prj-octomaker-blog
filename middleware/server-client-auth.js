export default function({ store, redirect }) {
  const user = store.getters.user;
  !user ? redirect("/user/join") : ``;
}
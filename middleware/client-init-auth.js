export default async function ({ store }) {
  process.client ? await store.dispatch('initAuth') : ``
}
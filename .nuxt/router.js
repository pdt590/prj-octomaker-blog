import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10baaadc = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _69ad8ad6 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages_posts_index" */))
const _84b8aafa = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _5e305cce = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */))
const _6a569cc0 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _eb83f4ee = () => interopDefault(import('..\\pages\\posts\\new-post\\index.vue' /* webpackChunkName: "pages_posts_new-post_index" */))
const _6a1d6f4a = () => interopDefault(import('..\\pages\\user\\action\\index.vue' /* webpackChunkName: "pages_user_action_index" */))
const _a051e554 = () => interopDefault(import('..\\pages\\user\\join\\index.vue' /* webpackChunkName: "pages_user_join_index" */))
const _d29e0d42 = () => interopDefault(import('..\\pages\\user\\mgmt\\index.vue' /* webpackChunkName: "pages_user_mgmt_index" */))
const _3005d00b = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages_user_profile_index" */))
const _1606e6aa = () => interopDefault(import('..\\pages\\user\\resetpassword\\index.vue' /* webpackChunkName: "pages_user_resetpassword_index" */))
const _703895ab = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _1de1a50e = () => interopDefault(import('..\\pages\\query\\author\\_authorId\\index.vue' /* webpackChunkName: "pages_query_author__authorId_index" */))
const _ababd04e = () => interopDefault(import('..\\pages\\query\\category\\_categoryId\\index.vue' /* webpackChunkName: "pages_query_category__categoryId_index" */))
const _62f1bae6 = () => interopDefault(import('..\\pages\\posts\\_postUrl\\index.vue' /* webpackChunkName: "pages_posts__postUrl_index" */))
const _e74f32ea = () => interopDefault(import('..\\pages\\posts\\_postUrl\\edit-post\\index.vue' /* webpackChunkName: "pages_posts__postUrl_edit-post_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _10baaadc,
    name: "about___en"
  }, {
    path: "/posts",
    component: _69ad8ad6,
    name: "posts___en"
  }, {
    path: "/search",
    component: _84b8aafa,
    name: "search___en"
  }, {
    path: "/test",
    component: _5e305cce,
    name: "test___en"
  }, {
    path: "/user",
    component: _6a569cc0,
    name: "user___en"
  }, {
    path: "/posts/new-post",
    component: _eb83f4ee,
    name: "posts-new-post___en"
  }, {
    path: "/user/action",
    component: _6a1d6f4a,
    name: "user-action___en"
  }, {
    path: "/user/join",
    component: _a051e554,
    name: "user-join___en"
  }, {
    path: "/user/mgmt",
    component: _d29e0d42,
    name: "user-mgmt___en"
  }, {
    path: "/user/profile",
    component: _3005d00b,
    name: "user-profile___en"
  }, {
    path: "/user/resetpassword",
    component: _1606e6aa,
    name: "user-resetpassword___en"
  }, {
    path: "/vi/",
    component: _703895ab,
    name: "index___vi"
  }, {
    path: "/vi/about",
    component: _10baaadc,
    name: "about___vi"
  }, {
    path: "/vi/posts",
    component: _69ad8ad6,
    name: "posts___vi"
  }, {
    path: "/vi/search",
    component: _84b8aafa,
    name: "search___vi"
  }, {
    path: "/vi/test",
    component: _5e305cce,
    name: "test___vi"
  }, {
    path: "/vi/user",
    component: _6a569cc0,
    name: "user___vi"
  }, {
    path: "/vi/posts/new-post",
    component: _eb83f4ee,
    name: "posts-new-post___vi"
  }, {
    path: "/vi/user/action",
    component: _6a1d6f4a,
    name: "user-action___vi"
  }, {
    path: "/vi/user/join",
    component: _a051e554,
    name: "user-join___vi"
  }, {
    path: "/vi/user/mgmt",
    component: _d29e0d42,
    name: "user-mgmt___vi"
  }, {
    path: "/vi/user/profile",
    component: _3005d00b,
    name: "user-profile___vi"
  }, {
    path: "/vi/user/resetpassword",
    component: _1606e6aa,
    name: "user-resetpassword___vi"
  }, {
    path: "/vi/query/author/:authorId?",
    component: _1de1a50e,
    name: "query-author-authorId___vi"
  }, {
    path: "/vi/query/category/:categoryId?",
    component: _ababd04e,
    name: "query-category-categoryId___vi"
  }, {
    path: "/query/author/:authorId?",
    component: _1de1a50e,
    name: "query-author-authorId___en"
  }, {
    path: "/query/category/:categoryId?",
    component: _ababd04e,
    name: "query-category-categoryId___en"
  }, {
    path: "/vi/posts/:postUrl",
    component: _62f1bae6,
    name: "posts-postUrl___vi"
  }, {
    path: "/vi/posts/:postUrl/edit-post",
    component: _e74f32ea,
    name: "posts-postUrl-edit-post___vi"
  }, {
    path: "/posts/:postUrl",
    component: _62f1bae6,
    name: "posts-postUrl___en"
  }, {
    path: "/posts/:postUrl/edit-post",
    component: _e74f32ea,
    name: "posts-postUrl-edit-post___en"
  }, {
    path: "/",
    component: _703895ab,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

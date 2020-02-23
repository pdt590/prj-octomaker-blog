import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62f395d7 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _8833145e = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages_posts_index" */))
const _9aefc230 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _78b81b3e = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */))
const _1226e665 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _7e15b2c4 = () => interopDefault(import('..\\pages\\posts\\new-post\\index.vue' /* webpackChunkName: "pages_posts_new-post_index" */))
const _55b043ef = () => interopDefault(import('..\\pages\\user\\action\\index.vue' /* webpackChunkName: "pages_user_action_index" */))
const _0a1e718a = () => interopDefault(import('..\\pages\\user\\join\\index.vue' /* webpackChunkName: "pages_user_join_index" */))
const _3c6a9978 = () => interopDefault(import('..\\pages\\user\\mgmt\\index.vue' /* webpackChunkName: "pages_user_mgmt_index" */))
const _9264dff4 = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages_user_profile_index" */))
const _61010336 = () => interopDefault(import('..\\pages\\user\\resetpassword\\index.vue' /* webpackChunkName: "pages_user_resetpassword_index" */))
const _b45381e0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _4d77329e = () => interopDefault(import('..\\pages\\query\\author\\_authorId\\index.vue' /* webpackChunkName: "pages_query_author__authorId_index" */))
const _49ddfb04 = () => interopDefault(import('..\\pages\\query\\category\\_categoryId\\index.vue' /* webpackChunkName: "pages_query_category__categoryId_index" */))
const _56c96821 = () => interopDefault(import('..\\pages\\posts\\_postUrl\\index.vue' /* webpackChunkName: "pages_posts__postUrl_index" */))
const _6ed3b670 = () => interopDefault(import('..\\pages\\posts\\_postUrl\\edit-post\\index.vue' /* webpackChunkName: "pages_posts__postUrl_edit-post_index" */))

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
    component: _62f395d7,
    name: "about___en"
  }, {
    path: "/posts",
    component: _8833145e,
    name: "posts___en"
  }, {
    path: "/search",
    component: _9aefc230,
    name: "search___en"
  }, {
    path: "/test",
    component: _78b81b3e,
    name: "test___en"
  }, {
    path: "/user",
    component: _1226e665,
    name: "user___en"
  }, {
    path: "/posts/new-post",
    component: _7e15b2c4,
    name: "posts-new-post___en"
  }, {
    path: "/user/action",
    component: _55b043ef,
    name: "user-action___en"
  }, {
    path: "/user/join",
    component: _0a1e718a,
    name: "user-join___en"
  }, {
    path: "/user/mgmt",
    component: _3c6a9978,
    name: "user-mgmt___en"
  }, {
    path: "/user/profile",
    component: _9264dff4,
    name: "user-profile___en"
  }, {
    path: "/user/resetpassword",
    component: _61010336,
    name: "user-resetpassword___en"
  }, {
    path: "/vi/",
    component: _b45381e0,
    name: "index___vi"
  }, {
    path: "/vi/about",
    component: _62f395d7,
    name: "about___vi"
  }, {
    path: "/vi/posts",
    component: _8833145e,
    name: "posts___vi"
  }, {
    path: "/vi/search",
    component: _9aefc230,
    name: "search___vi"
  }, {
    path: "/vi/test",
    component: _78b81b3e,
    name: "test___vi"
  }, {
    path: "/vi/user",
    component: _1226e665,
    name: "user___vi"
  }, {
    path: "/vi/posts/new-post",
    component: _7e15b2c4,
    name: "posts-new-post___vi"
  }, {
    path: "/vi/user/action",
    component: _55b043ef,
    name: "user-action___vi"
  }, {
    path: "/vi/user/join",
    component: _0a1e718a,
    name: "user-join___vi"
  }, {
    path: "/vi/user/mgmt",
    component: _3c6a9978,
    name: "user-mgmt___vi"
  }, {
    path: "/vi/user/profile",
    component: _9264dff4,
    name: "user-profile___vi"
  }, {
    path: "/vi/user/resetpassword",
    component: _61010336,
    name: "user-resetpassword___vi"
  }, {
    path: "/vi/query/author/:authorId?",
    component: _4d77329e,
    name: "query-author-authorId___vi"
  }, {
    path: "/vi/query/category/:categoryId?",
    component: _49ddfb04,
    name: "query-category-categoryId___vi"
  }, {
    path: "/query/author/:authorId?",
    component: _4d77329e,
    name: "query-author-authorId___en"
  }, {
    path: "/query/category/:categoryId?",
    component: _49ddfb04,
    name: "query-category-categoryId___en"
  }, {
    path: "/vi/posts/:postUrl",
    component: _56c96821,
    name: "posts-postUrl___vi"
  }, {
    path: "/vi/posts/:postUrl/edit-post",
    component: _6ed3b670,
    name: "posts-postUrl-edit-post___vi"
  }, {
    path: "/posts/:postUrl",
    component: _56c96821,
    name: "posts-postUrl___en"
  }, {
    path: "/posts/:postUrl/edit-post",
    component: _6ed3b670,
    name: "posts-postUrl-edit-post___en"
  }, {
    path: "/",
    component: _b45381e0,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

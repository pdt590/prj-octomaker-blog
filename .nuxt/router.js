import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2ae54bc3 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _f84fa886 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages_posts_index" */))
const _2e65b308 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _4bfc105c = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages_test_index" */))
const _7370c2f9 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _7c041ca0 = () => interopDefault(import('..\\pages\\posts\\new-post\\index.vue' /* webpackChunkName: "pages_posts_new-post_index" */))
const _362366fa = () => interopDefault(import('..\\pages\\user\\action\\index.vue' /* webpackChunkName: "pages_user_action_index" */))
const _1d003662 = () => interopDefault(import('..\\pages\\user\\join\\index.vue' /* webpackChunkName: "pages_user_join_index" */))
const _4f4c5e50 = () => interopDefault(import('..\\pages\\user\\mgmt\\index.vue' /* webpackChunkName: "pages_user_mgmt_index" */))
const _0f5099f2 = () => interopDefault(import('..\\pages\\user\\profile\\index.vue' /* webpackChunkName: "pages_user_profile_index" */))
const _56166751 = () => interopDefault(import('..\\pages\\user\\resetpassword\\index.vue' /* webpackChunkName: "pages_user_resetpassword_index" */))
const _6ed3cab8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _28ae059c = () => interopDefault(import('..\\pages\\query\\author\\_authorId\\index.vue' /* webpackChunkName: "pages_query_author__authorId_index" */))
const _1f736312 = () => interopDefault(import('..\\pages\\query\\category\\_categoryId\\index.vue' /* webpackChunkName: "pages_query_category__categoryId_index" */))
const _ca9cb1e6 = () => interopDefault(import('..\\pages\\posts\\_postUrl\\index.vue' /* webpackChunkName: "pages_posts__postUrl_index" */))
const _47bd2c04 = () => interopDefault(import('..\\pages\\posts\\_postUrl\\edit-post\\index.vue' /* webpackChunkName: "pages_posts__postUrl_edit-post_index" */))

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
    component: _2ae54bc3,
    name: "about___en"
  }, {
    path: "/posts",
    component: _f84fa886,
    name: "posts___en"
  }, {
    path: "/search",
    component: _2e65b308,
    name: "search___en"
  }, {
    path: "/test",
    component: _4bfc105c,
    name: "test___en"
  }, {
    path: "/user",
    component: _7370c2f9,
    name: "user___en"
  }, {
    path: "/posts/new-post",
    component: _7c041ca0,
    name: "posts-new-post___en"
  }, {
    path: "/user/action",
    component: _362366fa,
    name: "user-action___en"
  }, {
    path: "/user/join",
    component: _1d003662,
    name: "user-join___en"
  }, {
    path: "/user/mgmt",
    component: _4f4c5e50,
    name: "user-mgmt___en"
  }, {
    path: "/user/profile",
    component: _0f5099f2,
    name: "user-profile___en"
  }, {
    path: "/user/resetpassword",
    component: _56166751,
    name: "user-resetpassword___en"
  }, {
    path: "/vi/",
    component: _6ed3cab8,
    name: "index___vi"
  }, {
    path: "/vi/about",
    component: _2ae54bc3,
    name: "about___vi"
  }, {
    path: "/vi/posts",
    component: _f84fa886,
    name: "posts___vi"
  }, {
    path: "/vi/search",
    component: _2e65b308,
    name: "search___vi"
  }, {
    path: "/vi/test",
    component: _4bfc105c,
    name: "test___vi"
  }, {
    path: "/vi/user",
    component: _7370c2f9,
    name: "user___vi"
  }, {
    path: "/vi/posts/new-post",
    component: _7c041ca0,
    name: "posts-new-post___vi"
  }, {
    path: "/vi/user/action",
    component: _362366fa,
    name: "user-action___vi"
  }, {
    path: "/vi/user/join",
    component: _1d003662,
    name: "user-join___vi"
  }, {
    path: "/vi/user/mgmt",
    component: _4f4c5e50,
    name: "user-mgmt___vi"
  }, {
    path: "/vi/user/profile",
    component: _0f5099f2,
    name: "user-profile___vi"
  }, {
    path: "/vi/user/resetpassword",
    component: _56166751,
    name: "user-resetpassword___vi"
  }, {
    path: "/vi/query/author/:authorId?",
    component: _28ae059c,
    name: "query-author-authorId___vi"
  }, {
    path: "/vi/query/category/:categoryId?",
    component: _1f736312,
    name: "query-category-categoryId___vi"
  }, {
    path: "/query/author/:authorId?",
    component: _28ae059c,
    name: "query-author-authorId___en"
  }, {
    path: "/query/category/:categoryId?",
    component: _1f736312,
    name: "query-category-categoryId___en"
  }, {
    path: "/vi/posts/:postUrl",
    component: _ca9cb1e6,
    name: "posts-postUrl___vi"
  }, {
    path: "/vi/posts/:postUrl/edit-post",
    component: _47bd2c04,
    name: "posts-postUrl-edit-post___vi"
  }, {
    path: "/posts/:postUrl",
    component: _ca9cb1e6,
    name: "posts-postUrl___en"
  }, {
    path: "/posts/:postUrl/edit-post",
    component: _47bd2c04,
    name: "posts-postUrl-edit-post___en"
  }, {
    path: "/",
    component: _6ed3cab8,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

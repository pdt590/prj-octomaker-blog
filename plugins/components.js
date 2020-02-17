import Vue from "vue";

Vue.component("v-navbar", () => import("~/components/Navbar"));
Vue.component("v-footer", () => import("~/components/Footer"));
if (process.client) {
  Vue.component("v-editor", () => import("~/components/Editor"));
}

// Card
Vue.component("v-card-post", () => import("~/components/CardPost"));
Vue.component("v-card-post-recommend", () => import("~/components/CardPostRecommend"));
Vue.component("v-card-post-horizontal", () => import("~/components/CardPostHorizontal"));

// Modal
Vue.component("v-modal-join", () => import("~/components/ModalJoin"));
Vue.component("v-modal-image", () => import("~/components/ModalImage"));
Vue.component("v-modal-link", () => import("~/components/ModalLink"));
Vue.component("v-modal-embed", () => import("~/components/ModalEmbed"));
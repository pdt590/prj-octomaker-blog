import Vue from "vue";

Vue.component("v-navbar", () => import("~/components/Navbar"));
Vue.component("v-footer", () => import("~/components/Footer"));

// Card
Vue.component("v-card-post", () => import("~/components/CardPost"));
Vue.component("v-card-post-4user", () => import("~/components/CardPost4User"));

// Modal
Vue.component("v-modal-login", () => import("~/components/ModalLogin"));
Vue.component("v-modal-signup", () => import("~/components/ModalSignup"));
Vue.component("v-modal-join", () => import("~/components/ModalJoin"));
Vue.component("v-modal-confirm", () => import("~/components/ModalConfirm"));
Vue.component("v-modal-link", () => import("~/components/ModalLink"));
Vue.component("v-modal-image", () => import("~/components/ModalImage"));
Vue.component("v-modal-embed", () => import("~/components/ModalEmbed"));

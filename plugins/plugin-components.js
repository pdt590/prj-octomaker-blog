import Vue from "vue";

Vue.component("v-navbar", () => import("~/components/Navbar"));
Vue.component("v-navbar-mobile", () => import("~/components/NavbarMobile"));
Vue.component("v-footer", () => import("~/components/Footer"));

// Card
Vue.component("v-card-post", () => import("~/components/CardPost"));
Vue.component("v-card-post-4user", () => import("~/components/CardPost4User"));
Vue.component("v-card-post-mobile", () =>
  import("~/components/CardPostMobile")
);

// Modal
Vue.component("v-modal-login", () => import("~/components/ModalLogin"));
Vue.component("v-modal-signup", () => import("~/components/ModalSignup"));
Vue.component("v-modal-join", () => import("~/components/ModalJoin"));
Vue.component("v-modal-delete-confirm", () =>
  import("~/components/ModalDeleteConfirm")
);
Vue.component("v-modal-discard-confirm", () =>
  import("~/components/ModalDiscardConfirm")
);

<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_confirm.title") }}</p>
    </header>
    <section class="modal-card-body">
      <div class="buttons" style="display: flex; justify-content: center">
        <a
          class="button is-info is-outlined is-medium"
          @click="$parent.close()"
          >{{ $t("modal_confirm.cancel_btn") }}</a
        >
        <a
          class="button is-info is-outlined is-medium"
          :class="{ 'is-loading': postLoading }"
          @click="onDelete"
          >{{ $t("modal_confirm.delete_btn") }}</a
        >
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "v-modal-confirm",
  computed: {
    ...mapGetters({ postLoading: "post/postLoading" }),
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    }
  }
};
</script>

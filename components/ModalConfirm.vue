<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Đồng ý xóa?</p>
    </header>
    <section class="modal-card-body">
      <div class="buttons" style="display: flex; justify-content: center">
        <a
          class="button is-info is-outlined is-medium"
          :class="{ 'is-loading': postLoading }"
          @click="onDelete"
          >Đồng ý</a
        >
        <a class="button is-info is-outlined is-medium" @click="$parent.close()"
          >Hủy</a
        >
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["postLoading"])
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    }
  }
};
</script>

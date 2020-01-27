<template>
  <div>
    <form class>
      <div class="modal-card v-modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Bạn có đồng ý xóa?</p>
        </header>
        <section class="modal-card-body">
          <div class="buttons" style="display: flex; justify-content: center">
            <a
              class="button is-grey is-outlined is-rounded is-medium"
              :class="{ 'is-loading': postLoading }"
              @click.prevent="onDelete"
              >Đồng ý</a
            >
            <a
              class="button is-grey is-outlined is-rounded is-medium"
              @click.prevent="$parent.close()"
              >Hủy</a
            >
          </div>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    postData: Object
  },
  computed: {
    ...mapGetters(["postLoading"])
  },
  methods: {
    async onDelete() {
      await this.$store.dispatch("deletePostByUser", this.postData.url);
      this.$parent.close();
      location.reload();
    }
  }
};
</script>

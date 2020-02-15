<template>
  <div class="container">
    <div class="_section-header">
      <p
        class="is-size-5 is-capitalized has-text-black has-text-weight-semibold"
      >
        Posts
      </p>
    </div>
    <div class="columns is-multiline is-variable is-4">
      <div
        class="column is-3"
        v-for="(post, index) in loadedPosts"
        :key="index"
      >
        <v-card-post :value="post" />
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <button
          class="button is-info is-outlined"
          :class="{ 'is-loading': queryLoading }"
          :disabled="!loadedPosts.length"
          @click="onLoad"
        >
          Xem thêm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["queryLoading"])
  },
  async asyncData({ app, store, params, error }) {
    const maxPosts = 12;
    let loadedPosts = await store.dispatch("loadPosts", { limit: maxPosts });
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadPosts() Error" });
    }
    return {
      loadedPosts: loadedPosts,
      maxPosts: maxPosts
    };
  },
  methods: {
    async onLoad() {
      const endAtKey = this.loadedPosts[this.loadedPosts.length - 1]
        .updatedDate;
      let loadedMorePosts = await this.$store.dispatch("loadPosts", {
        limit: this.maxPosts + 1,
        endAtKey: endAtKey
      });
      if (this.queryLoading) {
        this.$store.commit("setQueryLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onLoad() Error",
          type: "is-danger"
        });
      } else {
        loadedMorePosts.length ? loadedMorePosts.shift() : ``; // Remove first item
        this.loadedPosts = [...this.loadedPosts, ...loadedMorePosts];
      }
    }
  },
  head() {
    return {
      title: "Posts",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "We make what you need"
        }
      ]
    };
  }
};
</script>

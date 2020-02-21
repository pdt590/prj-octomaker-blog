<template>
  <div class="container">
    <div class="_section-header">
      <p
        class="is-size-5 is-capitalized has-text-black has-text-weight-semibold"
      >
        {{ $t("home.posts_text") }}
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
          {{ $t("home.more_btn") }}
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
  async asyncData({ store, params, error }) {
    const maxPosts = 12;
    const loadedPosts = await store.dispatch("loadLazyPosts", { limit: maxPosts });
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadLazyPosts() Error" });
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
      let loadedMorePosts = await this.$store.dispatch("loadLazyPosts", {
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
      title: this.$t("home.head.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("home.head.content")
        }
      ]
    };
  }
};
</script>

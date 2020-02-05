<template>
  <div class="container">
    <div class="v-header">
      <p class="is-size-5 is-capitalized has-text-black has-text-weight-semibold">Posts</p>
    </div>
    <div class="columns is-multiline is-variable is-2">
      <div class="column is-2" v-for="(post, index) in loadedPosts" :key="index">
        <v-card-post class="is-hidden-mobile" :value="post" />
        <v-card-post-mobile class="is-hidden-tablet" :value="post" />
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <button
          class="button is-outlined"
          :class="{ 'is-loading': queryLoading }"
          :disabled="!loadedPosts.length"
          @click="onLoad"
        >Xem thêm</button>
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
    let loadedPosts = [];
    const limit = 18;
    loadedPosts = await store.dispatch("loadPosts", { limit: limit });
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadPosts() Error" });
    }
    return {
      loadedPosts: loadedPosts,
      limit: limit
    };
  },
  methods: {
    async onLoad() {
      const endAtKey = this.loadedPosts[this.loadedPosts.length - 1]
        .updatedDate;
      let loadedMorePosts = await this.$store.dispatch("loadPosts", {
        limit: this.limit + 1,
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

<style lang="scss" scoped>
.v-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

@media screen and (min-width: 768px) {
  iframe {
    width: 20vw;
    height: 26vh;
  }
}

@media screen and (max-width: 768px) {
  iframe {
    width: 90vw;
    height: 30vh;
  }
}
</style>

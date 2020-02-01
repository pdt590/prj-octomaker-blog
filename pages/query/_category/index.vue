<template>
  <div class="container">
    <nav class="breadcrumb is-hidden-mobile">
      <ul>
        <li>
          <nuxt-link to="/">Trang chủ</nuxt-link>
        </li>
        <li class="is-active">
          <a>{{ queryName }}</a>
        </li>
      </ul>
    </nav>
    <div class="card">
      <div class="card-content">
        <div class="columns is-multiline is-variable is-1" style="padding-top: 1rem">
          <div class="column is-2" v-for="post in loadedPosts" :key="post.url">
            <v-card-post class="is-hidden-mobile" :value="post" />
            <v-card-post-mobile class="is-hidden-tablet" :value="post" />
          </div>
        </div>
        <b-pagination
          :total="totalPosts"
          :current.sync="currentPostPage"
          order="is-centered"
          size="is-medium"
          :per-page="perPage"
          @change="onPagPostChange"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  computed: {
    ...mapGetters(["queryLoading"]),
    totalPosts() {
      return this.loadedPosts.length;
    }
  },
  async asyncData({ app, store, params }) {
    let loadedPosts = [];
    const queryKey = params.category;
    loadedPosts = await store.dispatch("loadCategorizedPosts", queryKey);
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadCategorizedPosts() Error" });
    }
    const category = categories.find(item => item.id === queryKey);
    const queryName = category.name;
    return {
      queryName: queryName,
      loadedPosts: loadedPosts
    };
  },
  data() {
    return {
      currentPostPage: 1,
      perPage: 6
    };
  },
  methods: {
    onPagPostChange(pageCount) {
      this.currentPostPage = pageCount;
    }
  }
};
</script>

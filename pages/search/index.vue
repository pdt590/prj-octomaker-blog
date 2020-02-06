<template>
  <div class="container">
    <nav class="breadcrumb is-hidden-mobile">
      <ul>
        <li>
          <nuxt-link to="/">Trang chủ</nuxt-link>
        </li>
        <li class="is-active">
          <a>Tìm kiếm "{{ searchKey }}"</a>
        </li>
      </ul>
    </nav>
    <div class="card">
      <div class="card-content">
        <div
          class="columns is-multiline is-variable is-1"
          style="padding-top: 1rem"
        >
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

export default {
  computed: {
    ...mapGetters(["queryLoading"]),
    totalPosts() {
      return this.loadedPosts.length;
    },
    postThumbnail() {
      return `${process.env.baseUrl}/icon-photo.png`;
    }
  },
  async asyncData({ store, query, error }) {
    let loadedPosts = [];
    const searchKey = query.key;
    loadedPosts = await store.dispatch("loadSearchPosts", searchKey);
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadSearchPosts() Error" });
    }
    return {
      searchKey: searchKey,
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
  },
  head() {
    return {
      title: "Search Results - OctoMaker",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `"${this.searchKey}" - OctoMaker`
        },
        {
          hid: "og-url",
          property: "og:url",
          content: `${process.env.baseUrl}${this.$route.path}`
        },
        {
          hid: "og-title",
          property: "og:title",
          content: "Search Results - OctoMaker"
        },
        {
          hid: "og-description",
          property: "og:description",
          content: `Search "${this.searchKey}"`
        },
        {
          hid: "og-image",
          property: "og:image",
          content: this.postThumbnail
        }
      ]
    };
  }
};
</script>
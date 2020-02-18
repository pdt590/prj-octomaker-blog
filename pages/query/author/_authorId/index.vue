<template>
  <div class="container">
    <nav class="breadcrumb">
      <ul>
        <li>
          <nuxt-link :to="localePath('/')">{{
            $t("author.home_link")
          }}</nuxt-link>
        </li>
        <li>
          <a :href="authorWebsite">{{ `@${authorUsername}` }}</a>
        </li>
      </ul>
    </nav>
    <div class="columns is-multiline is-variable is-4">
      <div class="column is-3" v-for="post in loadedPosts" :key="post.url">
        <v-card-post :value="post" />
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
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  computed: {
    ...mapGetters(["queryLoading", "authLoading"]),
    totalPosts() {
      return this.loadedPosts.length;
    },
    authorUsername() {
      return this.loadedAuthor.username;
    },
    /* authorFullname() {
      return this.loadedAuthor.fullname ? this.loadedAuthor.fullname : ``;
    }, */
    authorWebsite() {
      return this.loadedAuthor.website ? this.loadedAuthor.website : `/`;
    },
    /* authorPhone() {
      return this.loadedAuthor.phone ? this.loadedAuthor.phone : ``;
    },
    authorAddress() {
      return this.loadedAuthor.address ? this.loadedAuthor.address : ``;
    },
    authorProvince() {
      return this.loadedAuthor.province ? this.loadedAuthor.province : ``;
    }, */
    pageThumbnail() {
      return `${process.env.baseUrl}/icon-photo.png`;
    }
  },
  async asyncData({ app, store, params }) {
    const authorId = params.authorId;
    const loadedPosts = await store.dispatch("loadPersonalPosts", authorId);
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadPersonalPosts() Error" });
    }
    const loadedAuthor = await store.dispatch("loadUser", authorId);
    if (store.getters.authLoading) {
      store.commit("setAuthLoading", false);
      error({ statusCode: 500, message: "loadUser() Error" });
    }
    return {
      loadedAuthor: loadedAuthor,
      loadedPosts: loadedPosts
    };
  },
  data() {
    return {
      currentPostPage: 1,
      perPage: 12
    };
  },
  methods: {
    onPagPostChange(pageCount) {
      this.currentPostPage = pageCount;
    }
  },
  head() {
    return {
      title: this.queryName,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `"${this.queryName}" - OctoMaker`
        },
        {
          hid: "og-url",
          property: "og:url",
          content: `${process.env.baseUrl}${this.$route.path}`
        },
        {
          hid: "og-title",
          property: "og:title",
          content: this.queryName
        },
        {
          hid: "og-description",
          property: "og:description",
          content: `"${this.queryName}" category`
        },
        {
          hid: "og-image",
          property: "og:image",
          content: this.pageThumbnail // TODO
        }
      ]
    };
  }
};
</script>

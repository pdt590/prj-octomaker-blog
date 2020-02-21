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
          <a :href="creatorWebsite">{{ `@${creatorUsername}` }}</a>
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
    creatorUsername() {
      return this.loadedCreator.username;
    },
    /* 
    creatorFullname() {
      return this.loadedCreator.fullname ? this.loadedCreator.fullname : ``;
    }, 
    */
    creatorWebsite() {
      return this.loadedCreator.website ? this.loadedCreator.website : `/`;
    },
    /* 
    creatorPhone() {
      return this.loadedCreator.phone ? this.loadedCreator.phone : ``;
    },
    creatorAddress() {
      return this.loadedCreator.address ? this.loadedCreator.address : ``;
    },
    creatorProvince() {
      return this.loadedCreator.province ? this.loadedCreator.province : ``;
    }, 
    */
    pageThumbnail() {
      return `${process.env.baseUrl}/icon-photo.png`;
    }
  },
  async asyncData({ store, params }) {
    const creatorId = params.creatorId;
    const loadedPosts = await store.dispatch("loadPersonalPosts", creatorId);
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadPersonalPosts() Error" });
    }
    const loadedCreator = await store.dispatch("loadUser", creatorId);
    if (store.getters.authLoading) {
      store.commit("setAuthLoading", false);
      error({ statusCode: 500, message: "loadUser() Error" });
    }
    return {
      loadedCreator: loadedCreator,
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

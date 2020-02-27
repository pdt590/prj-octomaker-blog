<template>
  <div class="container">
    <div class="columns">
      <div class="column is-1">
        <!-- Start user avatar -->
        <div style="position: sticky; top: 8rem;">
          <div class="level">
            <div class="level-item">
              <nuxt-link :to="localePath(`/query/author/${creatorId}`)">
                <figure>
                  <client-only>
                    <img
                      class="_profile-avatar"
                      v-lazy="creatorAvatarUrl"
                      style="display: none"
                      onload="this.style.display = 'block'"
                      alt="user_avatar"
                    />
                  </client-only>
                </figure>
              </nuxt-link>
            </div>
          </div>
          <div class="level">
            <div class="level-item">
              <nuxt-link
                v-if="isEditable"
                class="button"
                :class="{ 'is-loading': postLoading }"
                :to="localePath(`/posts/${$route.params.postUrl}/edit-post`)"
              >
                <b-icon icon="pencil-alt"></b-icon>
              </nuxt-link>
            </div>
          </div>
          <div class="level">
            <div class="level-item">
              <button class="button" @click="onWindowPopup">
                <b-icon pack="fab" icon="facebook-f"></b-icon>
              </button>
            </div>
          </div>
          <div class="level">
            <div class="level-item">
              <button class="button" @click="onSavePost">
                <b-icon icon="save"></b-icon>
              </button>
            </div>
          </div>
        </div>
        <!-- End user avatar -->
      </div>
      <div class="column is-8">
        <!-- Start post content -->
        <div class="card">
          <div class="card-content">
            <h1 class="_post-title">{{ postTitle }}</h1>
            <br />
            <div class="tags">
              <span
                v-for="(tag, index) in postTags"
                :key="index"
                class="tag is-warning is-medium"
                >{{ tag }}</span
              >
            </div>
            <br />
            <article class="content markdown-body toc-content" v-highlight>
              <span v-html="postHtml"></span>
            </article>
          </div>
        </div>
        <!-- End post content -->
        <br />
        <!-- Start facebook comment -->
        <div class="card">
          <div class="card-content">
            <client-only>
              <div id="fb-root"></div>
              <div
                class="fb-comments"
                :data-href="`${baseUrl}${$route.path}`"
                data-numposts="5"
                data-width="100%"
              ></div>
            </client-only>
          </div>
        </div>
        <!-- End facebook comment -->
      </div>
      <div class="column is-3">
        <div style="position: sticky; top: 8rem;">
          <!-- Start ToC -->
          <div class="card">
            <header class="card-header" style="border-bottom: none;">
              <p class="card-header-title">
                {{ $t("post.table_content") }}
              </p>
            </header>
            <div class="card-content" style="padding-top: 0;">
              <div class="toc"></div>
            </div>
          </div>
          <!-- End ToC -->
          <!-- Start recommended posts -->
          <div class="card" style="margin-top: 1rem">
            <header class="card-header" style="border-bottom: none;">
              <p class="card-header-title">
                {{ $t("post.more_posts_from") }}&nbsp;
                <nuxt-link
                  :to="localePath(`/query/author/${creatorId}`)"
                  class="has-text-dark"
                  >@{{ creatorUsername }}</nuxt-link
                >
              </p>
            </header>
            <div class="card-content" style="padding-top: 0;">
              <div v-for="(post, index) in recommendedPosts" :key="index">
                <v-card-post-recommend :value="post" />
              </div>
            </div>
          </div>
          <!-- End recommended posts -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  fetchDesc,
  initFbComment,
  initToC,
  windowPopup,
  savePost
} from "~/libs/helpers";
import { categories } from "~/libs/lists";

export default {
  middleware: ["server-client-view-permission"],
  mounted() {
    initFbComment();
    initToC();
  },
  computed: {
    ...mapGetters(["user", "postLoading"]),
    creatorAvatarUrl() {
      if (this.loadedPost.creator.avatar) {
        return this.loadedPost.creator.avatar.url;
      } else {
        return "/icon-user.png";
      }
    },
    creatorId() {
      return this.loadedPost.creator.id;
    },
    creatorUsername() {
      return this.loadedPost.creator.username;
    },
    isEditable() {
      return this.user && this.user.id === this.loadedPost.creator.id;
    },
    postTitle() {
      return this.loadedPost.title;
    },
    postCategory() {
      const category = categories.find(
        item => item.id === this.loadedPost.category
      );
      return category.name;
    },
    postTags() {
      return this.loadedPost.tags;
    },
    postMode() {
      return this.loadedPost.mode;
    },
    postMarkdown() {
      return this.loadedPost.markdown;
    },
    postHtml() {
      return this.loadedPost.html;
    },
    postDescription() {
      return fetchDesc(this.postHtml);
    },
    postThumbnail() {
      if (this.loadedPost.images) {
        return this.loadedPost.images[0].url;
      } else {
        return `${process.env.baseUrl}/icon-photo.png`;
      }
    }
  },
  async asyncData({ store, params, error }) {
    const loadedPost = await store.dispatch("loadPost", params.postUrl);
    if (store.getters.postLoading) {
      store.commit("setPostLoading", false);
      error({ statusCode: 500, message: "loadPost() Error" });
    }
    const maxPosts = 3;
    const creatorId = loadedPost.creator.id;
    const recommendedPosts = await store.dispatch("loadRecommendedPosts", {
      limit: maxPosts,
      creatorId: creatorId
    });
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadRecommendedPosts() Error" });
    }
    return {
      loadedPost: loadedPost,
      recommendedPosts: recommendedPosts
    };
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      isModalJoinActive: false
    };
  },
  methods: {
    onWindowPopup() {
      windowPopup(
        `https://www.facebook.com/sharer/sharer.php?u=${this.baseUrl}${this.$route.path}`,
        "Post to Facebook",
        "900",
        "500"
      );
    },
    onSavePost() {
      savePost(this.postTitle, this.postMarkdown);
    }
  },
  head() {
    return {
      title: this.postTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.postDescription
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "article"
        },
        {
          hid: "og-title",
          property: "og:title",
          content: this.postTitle
        },
        {
          hid: "og-url",
          property: "og:url",
          content: `${process.env.baseUrl}${this.$route.path}`
        },
        {
          hid: "og-description",
          property: "og:description",
          content: this.postDescription
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

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-1">
        <div style="position: sticky; top: 8rem;">
          <div class="level">
            <div class="level-item">
              <nuxt-link :to="`/about`">
                <figure>
                  <client-only>
                    <img
                      class="_profile-avatar"
                      v-lazy="userAvatarUrl"
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
                :to="`/posts/${$route.params.postUrl}/edit-post`"
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
        </div>
      </div>
      <div class="column is-9">
        <div class="card">
          <!-- Start post content -->
          <div class="card-content">
            <h1 class="_post-title">{{ postTitle }}</h1>
            <br>
            <div class="tags">
              <span
                v-for="(tag, index) in postTags"
                :key="index"
                class="tag is-warning is-medium"
                >{{ tag }}</span
              >
            </div>
            <br>
            <article class="content markdown-body toc-content" v-highlight>
              <span v-html="postHtml"></span>
            </article>
          </div>
          <!-- End post content -->
        </div>
        <br>
        <div class="card">
          <div class="card-content">
            <div id="fb-root"></div>
            <div
              class="fb-comments"
              :data-href="`${baseUrl}/posts/${$route.params.postUrl}`"
              data-numposts="5"
              data-width="100%"
            ></div>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div style="position: sticky; top: 8rem;">
          <div class="toc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchDesc, windowPopup } from "~/libs/helpers";
import { categories } from "~/libs/lists";

export default {
  middleware: ["server-client-view-permission"],
  mounted() {
    this.$initFbSdk();
    this.$initToC();
  },
  computed: {
    ...mapGetters(["user", "loadedPost", "postLoading"]),
    userAvatarUrl() {
      if (this.loadedPost.creator.avatar) {
        return this.loadedPost.creator.avatar.url;
      } else {
        return "/icon-user.png";
      }
    },
    userName() {
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
  async fetch({ store, params, error }) {
    await store.dispatch("loadPost", params.postUrl);
    if (store.getters.postLoading) {
      store.commit("setPostLoading", false);
      error({ statusCode: 500, message: "loadPost() Error" });
    }
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
        `https://www.facebook.com/sharer/sharer.php?u=${this.baseUrl}/posts/${this.$route.params.postUrl}`,
        "Post to Facebook",
        "900",
        "500"
      );
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
          hid: "og-url",
          property: "og:url",
          content: `${process.env.baseUrl}${this.$route.path}`
        },
        {
          hid: "og-title",
          property: "og:title",
          content: this.postTitle
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

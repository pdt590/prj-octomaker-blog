<template>
  <div class="container">
    <div class="columns">
      <div class="column is-10">
        <div class="card">
          <div class="card-content">
            <h1 class="v-post-title">{{ postTitle }}</h1>
            <span v-html="postHtml"></span>
          </div>
        </div>
        <br />
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
          <!-- for computer -->
          <div class="card is-hidden-mobile">
            <div class="card-content">
              <div class="level">
                <div class="level-item">
                  <nuxt-link :to="`/about`">
                    <figure class="image v-image-border">
                      <client-only>
                        <img
                          class="v-user-avatar"
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
              <div class="has-text-centered">
                <h5 class="title is-size-5">{{ userName }}</h5>
              </div>
              <hr />
              <div class="buttons">
                <a
                  class="button is-info is-rounded is-outlined"
                  :href="
                    `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/posts/${$route.params.postUrl}`
                  "
                  target="_blank"
                >
                  <b-icon icon="share-variant"></b-icon>
                  <strong>Chia sẻ bài viết</strong>
                </a>
                <nuxt-link
                  v-if="isEditable"
                  class="button is-info is-rounded is-outlined"
                  :to="`/posts/${$route.params.postUrl}/edit-post`"
                >
                  <b-icon icon="settings-outline" size="is-small"></b-icon>
                  <strong>Chỉnh sửa</strong>
                </nuxt-link>
              </div>
            </div>
          </div>
          <!--  -->
          <!-- for mobile -->
          <b-collapse class="card is-hidden-tablet" :open="false">
            <header class="card-header" slot="trigger" slot-scope="props">
              <p class="card-header-title">
                <b-icon icon="information-outline"></b-icon>&nbsp;
                <span>Thông tin</span>
              </p>
              <p class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </p>
            </header>
            <div class="card-content">
              <div class="level">
                <div class="level-item">
                  <nuxt-link :to="`/about`">
                    <figure class="image v-image-border">
                      <client-only>
                        <img
                          class="v-user-avatar"
                          v-lazy="userAvatarUrl"
                          style="display: none"
                          onload="this.style.display = 'block'"
                          alt="shop_logo"
                        />
                      </client-only>
                    </figure>
                  </nuxt-link>
                </div>
              </div>
              <div class="has-text-centered">
                <h5 class="title is-size-5">{{ userName }}</h5>
              </div>
              <hr />
              <div class="buttons">
                <a
                  class="button is-info is-rounded is-outlined"
                  :href="
                    `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/posts/${$route.params.postUrl}`
                  "
                  target="_blank"
                >
                  <b-icon icon="share-variant"></b-icon>
                  <strong>Chia sẻ bài viết</strong>
                </a>
                <nuxt-link
                  v-if="isEditable"
                  class="button is-info is-rounded is-outlined"
                  :to="`/posts/${$route.params.postUrl}/edit-post`"
                >
                  <b-icon icon="settings-outline" size="is-small"></b-icon>
                  <strong>Chỉnh sửa</strong>
                </nuxt-link>
              </div>
            </div>
          </b-collapse>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  mounted() {
    this.$initFbSdk()
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
      return this.loadedPost.title
    },
    postHtml() {
      return this.loadedPost.html
    },
    postMode() {
      return this.loadedPost.mode
    },
    postCategory() {
      const category = categories.find(
        item => item.id === this.loadedPost.category
      );
      return category.name;
    },
    postThumbnail() {
      if (this.loadedPost.images) {
        return this.loadedPost.images[0].url;
      } else {
        return `${process.env.baseUrl}/icon-photo.png`;
      }
    }
  },
  async fetch({ app, store, params, error }) {
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
  head() {
    return {
      title: this.postTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "" //TODO
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
          content: "" //TODO
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

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .v-item-description {
    padding: 0 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  .v-item-description {
    padding-top: 1rem;
  }
}
.v-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.v-post-title {
  text-align: left;
  line-height: 1.2;
  font-weight: 700;
  color: #1b1b1b;
  word-wrap: break-word;
  word-break: break-word;
  font-size: 2.5rem;
}
</style>

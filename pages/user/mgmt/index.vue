<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <div style="position: sticky; top: 8rem;">
          <div class="card">
            <div class="card-content">
              <div class="level">
                <div class="level-item">
                  <nuxt-link :to="`/user/profile`">
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
              <div class="has-text-centered">
                <h5 class="title is-size-5">{{ userName }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-9">
        <div class="card">
          <div class="card-content">
            <b-tabs type="is-boxed">
              <b-tab-item>
                <template slot="header">
                  <div class="_align">
                    <b-icon icon="newspaper"></b-icon>
                    <span>Bài viết</span>
                  </div>
                </template>
                <div
                  style="padding-top: 1rem;"
                  v-for="post in loadedPersonalPosts"
                  :key="post.url"
                >
                  <v-card-post-4user :value="post" />
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "server-client-auth",
  computed: {
    ...mapGetters(["user", "queryLoading"]),
    userAvatarUrl() {
      if (this.user) {
        if (this.user.avatar) {
          return this.user.avatar.url;
        } else {
          return "/icon-user.png";
        }
      } else {
        // Check if logout happens
        return;
      }
    },
    userName() {
      if (this.user) {
        return this.user.username;
      } else {
        // Check if logout happens
        return;
      }
    }
  },
  async asyncData({ app, store, error }) {
    const loadedPersonalPosts = await store.dispatch("loadPersonalPosts");
    if (store.getters.queryLoading) {
      store.commit("setQueryLoading", false);
      error({ statusCode: 500, message: "loadPersonalPosts() Error" });
    }
    return {
      loadedPersonalPosts: loadedPersonalPosts
    };
  }
};
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <div style="position: sticky; top: 8rem;">
          <div class="card">
            <div class="card-content">
              <div class="v-username" v-if="user">
                <nuxt-link :to="`/user/profile`">
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
                <br />
                <h5 class="title is-size-5">{{ user.username }}</h5>
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
                  <b-icon icon="post-outline"></b-icon>
                  <span>Bài viết</span>
                </template>
                <div
                  style="padding-top: 1rem;"
                  v-for="post in loadedPersonalPosts"
                  :key="post.url"
                >
                  <v-card-post-4user :postData="post" />
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
      if (this.user.avatar) {
        return this.user.avatar.url;
      } else {
        return "/icon-user.png";
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

<style lang="scss" scoped>
.v-username {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

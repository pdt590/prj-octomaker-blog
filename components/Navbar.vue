<template>
  <div>
    <nav class="navbar is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/"></nuxt-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="v-navbar-center">
            <div class="navbar-item">
              <form>
                <b-field position="is-centered">
                  <b-input placeholder="Search..." type="search" icon="magnify" v-model="searchKey"></b-input>
                  <p class="control">
                    <button class="button" type="submit" @click.prevent="onSearch">Tìm Kiếm</button>
                  </p>
                </b-field>
              </form>
            </div>
          </div>
          <div class="navbar-end">
            <div
              class="navbar-item"
              v-if="
                !user &&
                  $route.path !== '/user/join' &&
                  $route.path !== '/user/activekey' &&
                  $route.path !== '/user/resetpassword'
              "
            >
              <div class="buttons">
                <a class="button is-info is-outlined" @click="isModalJoinActive = true">
                  <strong>Đăng nhập</strong>
                </a>
              </div>
            </div>
            <div class="navbar-item" v-if="user && $route.path !== '/posts/new-post'">
              <nuxt-link class="button is-info is-outlined" to="/posts/new-post">
                <strong>Tạo bài viết</strong>
              </nuxt-link>
            </div>
            <div class="navbar-item has-dropdown is-hoverable" v-if="user">
              <a class="navbar-link">
                <client-only>
                  <img
                    class="v-nav-avatar"
                    v-lazy="userAvatarUrl"
                    style="display: none"
                    onload="this.style.display = 'block'"
                    alt="avatar"
                  />
                </client-only>
              </a>
              <div class="navbar-dropdown is-right">
                <nuxt-link class="navbar-item" to="/user/profile">
                  <b-icon icon="settings-outline"></b-icon>
                  <p class="is-size-6">Cài đặt</p>
                </nuxt-link>
                <nuxt-link class="navbar-item" to="/user/mgmt">
                  <b-icon icon="finance"></b-icon>
                  <p class="is-size-6">Quản lý</p>
                </nuxt-link>
                <hr class="navbar-divider" />
                <a class="navbar-item" @click="onLogout">
                  <b-icon icon="logout-variant"></b-icon>
                  <p class="is-size-6">Thoát</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <b-modal :active.sync="isModalJoinActive" has-modal-card>
          <v-modal-join />
        </b-modal>
      </div>
    </nav>

    <nav class="navbar v-tag-navbar">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Danh mục</a>
              <div class="navbar-dropdown">
                <nuxt-link
                  class="navbar-item"
                  :to="`/query/${category.id}`"
                  v-for="(category, i) in categories"
                  :key="i"
                >
                  <b-icon :icon="category.icon"></b-icon>
                  <p class="is-size-6">{{ category.name }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <a
              href="/"
              target="_blank"
              class="navbar-item"
              style="padding-right: 1.5rem; padding-left: 1.5rem; border-left: 1px solid #D8D8D8"
            >
              <b-icon icon="facebook"></b-icon>
            </a>
            <a href="/" target="_blank" class="navbar-item">
              <b-icon icon="youtube"></b-icon>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="container" v-if="isAuthMessage">
      <b-message type="is-danger" size="is-small">Tài khoản chưa được kích hoạt</b-message>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  computed: {
    ...mapGetters(["user"]),
    userAvatarUrl() {
      if (this.user.avatar) {
        return this.user.avatar.url;
      } else {
        return "/icon-user.png";
      }
    },
    isAuthMessage() {
      if (this.user && !this.user.isActive) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      searchKey: null,
      isModalJoinActive: false,
      categories: categories
    };
  },
  methods: {
    async onLogout() {
      await this.$store.dispatch("logOut");
      if (this.$route.params.postUrl) {
        this.$router.push(`/posts/${this.$route.params.postUrl}`);
      } else {
        this.$router.push("/");
      }
    },
    onSearch() {
      window.location.href = `/search?key=${this.searchKey}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  border: none;
  border-bottom: 1px solid #d8d8d8;
  z-index: 6;
  &.v-tag-navbar {
    margin-top: 4.5rem; //$navbar-height: 4.5rem;
    z-index: 5;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    min-height: unset;
    height: 3rem;
    .navbar-menu {
      margin-top: 0.7rem;
      height: 3rem;
    }
  }
}
.navbar-brand .navbar-item {
  background: url(/logo.png) no-repeat center center;
  background-size: cover;
  width: 14rem;
  height: 4.5rem;
}
.navbar-menu .v-navbar-center {
  display: flex;
  align-items: center;
}
.navbar-dropdown .navbar-item {
  display: flex;
  align-items: center;
  padding-right: 1rem;
  p {
    margin-left: 1rem;
  }
}
</style>

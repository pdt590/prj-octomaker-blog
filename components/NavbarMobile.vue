<template>
  <div>
    <nav class="navbar is-fixed-top">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item v-logo" to="/"></nuxt-link>

        <div class="navbar-end">
          <a class="navbar-item" data-target="mobile-search" @click="onActiveSearch">
            <b-icon
              :icon="isSearchActive ? `close-box` : `magnify`"
              :type="isSearchActive ? `is-danger` : ``"
            ></b-icon>
          </a>
          <a class="navbar-item" data-target="mobile-new-post" @click="onOpenNewPost" v-if="user">
            <b-icon icon="plus-box-outline"></b-icon>
          </a>
          <a class="navbar-item" data-target="mobile-page-list" @click="onActiveCategories">
            <b-icon
              :icon="
                isCategoriesActive ? `close-box` : `view-dashboard-outline`
              "
              :type="isCategoriesActive ? `is-danger` : ``"
            ></b-icon>
          </a>
          <a class="navbar-item" data-target="mobile-menu" @click="onActiveProfile">
            <client-only v-if="user && !isProfileActive">
              <img
                class="v-nav-avatar-mobile"
                v-lazy="user.avatar ? user.avatar.url : `/icon-user.png`"
                style="display: none"
                onload="this.style.display = 'block'"
                alt="avatar"
              />
            </client-only>
            <b-icon
              v-else
              :icon="isProfileActive ? `close-box` : `menu`"
              :type="isProfileActive ? `is-danger` : ``"
            ></b-icon>
          </a>
        </div>
      </div>

      <div id="mobile-search" class="navbar-menu" :class="{ 'is-active': isSearchActive }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form>
              <b-field position="is-centered">
                <b-input placeholder="Search..." type="text" icon="magnify" v-model="searchKey"></b-input>
                <button class="button" type="submit" @click.prevent="onSearch">Tìm Kiếm</button>
              </b-field>
            </form>
          </div>
        </div>
      </div>

      <div id="mobile-page-list" class="navbar-menu" :class="{ 'is-active': isCategoriesActive }">
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-dropdown">
            <b-collapse v-for="(category, i) in categories" :key="i">
              <nuxt-link class="navbar-item" :to="`/query/?key=${category.id}`" slot="trigger">
                <b-icon :icon="category.icon"></b-icon>
                <p class="is-size-6">{{ category.name }}</p>
              </nuxt-link>
            </b-collapse>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="navbar-menu" :class="{ 'is-active': isProfileActive }">
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
            <a
              class="button is-info is-outlined"
              @click="
                isModalJoinActive = true;
                isProfileActive = false;
              "
            >
              <strong>Đăng nhập</strong>
            </a>
          </div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
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
      <b-modal :active.sync="isModalJoinActive" has-modal-card>
        <v-modal-join />
      </b-modal>
    </nav>

    <div v-if="isAuthMessage" style="margin-top: 4rem;">
      <b-message type="is-danger" size="is-small">Tài khoản chưa được kích hoạt</b-message>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  computed: {
    ...mapGetters(["user", "authLoading"]),
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

      isSearchActive: false,
      isCategoriesActive: false,
      isProfileActive: false,

      isModalJoinActive: false,

      categories: categories
    };
  },
  methods: {
    onActiveSearch() {
      this.isSearchActive = !this.isSearchActive;
      this.isProfileActive = false;
      this.isCategoriesActive = false;
    },
    onActiveCategories() {
      this.isCategoriesActive = !this.isCategoriesActive;
      this.isProfileActive = false;
      this.isSearchActive = false;
    },
    onActiveProfile() {
      this.isProfileActive = !this.isProfileActive;
      this.isCategoriesActive = false;
      this.isSearchActive = false;
    },
    onOpenNewPost() {
      this.isSearchActive = false;
      this.isCategoriesActive = false;
      this.isProfileActive = false;
      this.$router.push(`/posts/new-post`);
    },
    async onLogout() {
      await this.$store.dispatch("logOut");
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onLogout() Error",
          type: "is-danger"
        });
      } else {
        this.isProfileActive = false;
        if (this.$route.params.postUrl) {
          this.$router.push(`/posts/${this.$route.params.postUrl}`);
        } else {
          this.$router.push("/");
        }
      }
    },
    onSearch() {
      location.href = `/search?key=${this.searchKey}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  border: none;
  border-bottom: 1px solid #d8d8d8;
}
.navbar-brand .v-logo {
  background: url(/logo-mobile.png) no-repeat center center;
  background-size: cover;
  width: 4rem;
}
.navbar-end {
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  margin-left: auto;
  padding: 0;
}
.navbar-end .navbar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 3rem;
  position: relative;
  margin-left: auto;
}
.navbar-menu {
  height: 100vh;
}
.navbar-dropdown .navbar-item {
  display: flex;
  align-items: center;
  p {
    margin-left: 1rem;
  }
}
</style>

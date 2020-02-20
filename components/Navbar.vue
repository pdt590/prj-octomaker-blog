<template>
  <div>
    <!-- Start navbar -->
    <nav class="navbar _navbar is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" :to="localePath('/')">
            <figure>
              <client-only>
                <img
                  v-lazy="'/logo.png'"
                  style="display: none"
                  onload="this.style.display = 'block'"
                  alt="logo_image"
                />
              </client-only>
            </figure>
          </nuxt-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="_align">
            <div class="navbar-item">
              <form>
                <b-field position="is-centered">
                  <b-input
                    :placeholder="$t('navbar.search_placeholder')"
                    type="search"
                    icon="search"
                    v-model="searchKey"
                  ></b-input>
                  <p class="control">
                    <button
                      class="button"
                      type="submit"
                      @click.prevent="onSearch"
                    >
                      {{ $t("navbar.search_btn") }}
                    </button>
                  </p>
                </b-field>
              </form>
            </div>
          </div>
          <div class="navbar-end">
            <div
              class="navbar-item"
              v-if="user && $route.path !== localePath('/posts/new-post')"
            >
              <nuxt-link
                class="button is-info is-outlined"
                :to="localePath('/posts/new-post')"
              >
                <strong>{{ $t("navbar.new_post_btn") }}</strong>
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                v-if="$i18n.locale === 'en'"
                class="button is-info is-outlined"
                :to="switchLocalePath('vi')"
              >
                <strong>Vi</strong>
              </nuxt-link>
              <nuxt-link
                v-else
                class="button is-info is-outlined"
                :to="switchLocalePath('en')"
              >
                <strong>En</strong>
              </nuxt-link>
            </div>
            <div
              class="navbar-item"
              v-if="
                !user &&
                  !$route.path.includes('/user/join') &&
                  !$route.path.includes('/user/action') &&
                  !$route.path.includes('/user/resetpassword')
              "
            >
              <div class="buttons">
                <a
                  class="button is-info is-outlined"
                  @click="isModalJoinActive = true"
                >
                  <strong>{{ $t("navbar.login_btn") }}</strong>
                </a>
              </div>
            </div>
            <!-- Start user dropdown -->
            <div class="navbar-item has-dropdown is-hoverable" v-if="user">
              <a class="navbar-link">
                <figure>
                  <client-only>
                    <img
                      class="_nav-avatar"
                      :class="{ '_nav-avatar--danger': !isUserActive }"
                      v-lazy="userAvatarUrl"
                      style="display: none"
                      onload="this.style.display = 'block'"
                      alt="user_avatar"
                    />
                  </client-only>
                </figure>
              </a>
              <div class="navbar-dropdown _navbar-dropdown is-right">
                <a
                  class="navbar-item _navbar-dropdown__item"
                  v-if="!isUserActive"
                >
                  <b-icon icon="exclamation-circle" type="is-danger"></b-icon>
                  <p class="is-size-6 has-text-danger">
                    {{ $t("navbar.warning_message") }}
                  </p>
                </a>
                <hr class="navbar-divider" v-if="!isUserActive" />
                <nuxt-link
                  class="navbar-item _navbar-dropdown__item"
                  :to="localePath('/user/profile')"
                >
                  <b-icon icon="cog"></b-icon>
                  <p class="is-size-6">{{ $t("navbar.profile_link") }}</p>
                </nuxt-link>
                <nuxt-link
                  class="navbar-item _navbar-dropdown__item"
                  :to="localePath('/user/mgmt')"
                >
                  <b-icon icon="newspaper"></b-icon>
                  <p class="is-size-6">{{ $t("navbar.mgmt_link") }}</p>
                </nuxt-link>
                <hr class="navbar-divider" />
                <a class="navbar-item _navbar-dropdown__item" @click="onLogout">
                  <b-icon icon="sign-out-alt"></b-icon>
                  <p class="is-size-6">{{ $t("navbar.signout_link") }}</p>
                </a>
              </div>
            </div>
            <!-- End user dropdown -->
          </div>
        </div>
      </div>
      <b-modal
        :active.sync="isModalJoinActive"
        has-modal-card
        :can-cancel="false"
      >
        <v-modal-join />
      </b-modal>
    </nav>
    <!-- End navbar -->
    <!-- Start navbar tag -->
    <nav class="navbar _navbar-tag">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <!-- Start category dropdown -->
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link _navbar-link-category">{{
                $t("navbar.category_link")
              }}</a>
              <div class="navbar-dropdown">
                <nuxt-link
                  class="navbar-item _navbar-dropdown__item"
                  :to="localePath(`/query/category/${category.id}`)"
                  v-for="(category, i) in categories"
                  :key="i"
                >
                  <b-icon :icon="category.icon"></b-icon>
                  <p class="is-size-6">{{ category.name }}</p>
                </nuxt-link>
              </div>
            </div>
            <!-- End category dropdown -->
          </div>
          <div class="navbar-end">
            <a
              href="/"
              target="_blank"
              class="navbar-item _navbar-item-facebook"
            >
              <b-icon pack="fab" icon="facebook"></b-icon>
            </a>
            <a
              href="/"
              target="_blank"
              class="navbar-item _navbar-item-youtube"
            >
              <b-icon pack="fab" icon="youtube"></b-icon>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- End navbar tag -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";

export default {
  name: "navbar-site",
  computed: {
    ...mapGetters(["user", "authLoading"]),
    userAvatarUrl() {
      if (this.user.avatar) {
        return this.user.avatar.url;
      } else {
        return "/icon-user.png";
      }
    },
    isUserActive() {
      if (this.user && !this.user.isActive) {
        return false;
      } else {
        return true;
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
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onLogout() Error",
          type: "is-danger"
        });
      } else {
        if (this.$route.params.postUrl) {
          this.$router.push(
            this.localePath(`/posts/${this.$route.params.postUrl}`)
          );
        } else {
          this.$router.push(this.localePath("/"));
        }
      }
    },
    onSearch() {
      location.href = this.localePath(`/search?key=${this.searchKey}`);
    }
  }
};
</script>

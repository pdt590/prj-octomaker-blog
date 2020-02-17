<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <!-- Start login -->
        <div class="card _card-input" v-show="!isSignup">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              {{ $t("join.login.title") }}
            </p>
          </header>
          <div class="card-content">
            <b-field
              label="Email"
              :type="$v.formDataLogin.email.$error ? `is-danger` : ``"
              :message="
                !$v.formDataLogin.email.email
                  ? $t('join.login.email_message')
                  : ``
              "
            >
              <b-input
                type="email"
                v-model.trim="formDataLogin.email"
                @blur="$v.formDataLogin.email.$touch()"
              ></b-input>
            </b-field>

            <b-field
              label="Password"
              :type="$v.formDataLogin.password.$error ? `is-danger` : ``"
              :message="
                !$v.formDataLogin.password.minlen
                  ? $t('join.login.password_message')
                  : ``
              "
            >
              <b-input
                type="password"
                v-model.trim="formDataLogin.password"
                @blur="$v.formDataLogin.password.$touch()"
                password-reveal
              ></b-input>
            </b-field>
            <!-- <b-checkbox>Remember me</b-checkbox> -->
          </div>
          <footer class="card-footer" style="border-top: none; padding: 0.5rem">
            <div
              class="card-footer-item"
              style="justify-content: space-between"
            >
              <p>
                <a @click="isSignup = !isSignup">{{
                  isSignup
                    ? $t("join.login.login_text")
                    : $t("join.signup.signup_text")
                }}</a>
                <br />
                <nuxt-link :to="localePath('/user/resetpassword')">{{
                  $t("join.login.forget_password_link")
                }}</nuxt-link>
              </p>
              <button
                class="button is-info is-outlined"
                :class="{ 'is-loading': authLoading }"
                :disabled="$v.formDataLogin.$invalid"
                @click="onLogin"
              >
                {{ $t("join.login.login_btn") }}
              </button>
            </div>
          </footer>
        </div>
        <!-- End login -->
        <!-- Start signup -->
        <div class="card _card-input" v-show="isSignup">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              {{ $t("join.signup.title") }}
            </p>
          </header>
          <div class="card-content">
            <b-field
              label="Username"
              :type="$v.formDataSignup.username.$error ? `is-danger` : ``"
              :message="
                !$v.formDataSignup.username.minlen
                  ? $t('join.signup.username_message')
                  : ``
              "
            >
              <b-input
                type="text"
                v-model.trim="formDataSignup.username"
                @blur="$v.formDataSignup.username.$touch()"
              ></b-input>
            </b-field>

            <b-field
              label="Email"
              :type="$v.formDataSignup.email.$error ? `is-danger` : ``"
              :message="
                !$v.formDataSignup.email.email
                  ? $t('join.signup.email_message')
                  : ``
              "
            >
              <b-input
                type="email"
                v-model.trim="formDataSignup.email"
                @blur="$v.formDataSignup.email.$touch()"
              ></b-input>
            </b-field>

            <b-field
              label="Password"
              :type="$v.formDataSignup.password.$error ? `is-danger` : ``"
              :message="
                !$v.formDataSignup.password.minlen
                  ? $t('join.signup.password_message')
                  : ``
              "
            >
              <b-input
                type="password"
                v-model.trim="formDataSignup.password"
                @blur="$v.formDataSignup.password.$touch()"
                password-reveal
              ></b-input>
            </b-field>
            <!-- <b-checkbox>Remember me</b-checkbox> -->
          </div>
          <footer class="card-footer" style="border-top: none; padding: 0.5rem">
            <div
              class="card-footer-item"
              style="justify-content: space-between"
            >
              <a @click="isSignup = !isSignup">{{
                isSignup
                  ? $t("join.login.login_text")
                  : $t("join.signup.signup_text")
              }}</a>
              <button
                class="button is-info is-outlined"
                :class="{ 'is-loading': authLoading }"
                :disabled="$v.formDataSignup.$invalid"
                @click="onSignup"
              >
                {{ $t("join.signup.signup_btn") }}
              </button>
            </div>
          </footer>
        </div>
        <!-- End signup -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { authMessage } from "~/libs/helpers";

export default {
  validate({ store }) {
    const user = store.getters.user;
    return user ? false : true;
  },
  computed: {
    ...mapGetters(["authError", "authLoading"])
  },
  data() {
    return {
      formDataSignup: {
        username: null,
        email: null,
        password: null
      },
      formDataLogin: {
        email: null,
        password: null
      },
      isSignup: false
    };
  },
  validations: {
    formDataSignup: {
      username: {
        required,
        minlen: minLength(6)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minlen: minLength(6)
      }
    },
    formDataLogin: {
      email: {
        required,
        email
      },
      password: {
        required,
        minlen: minLength(6)
      }
    }
  },
  methods: {
    async onSignup() {
      await this.$store.dispatch("signUserUp", this.formDataSignup);
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$router.push(this.localePath("/"));
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("join.signup.toast.message"),
          type: "is-warning"
        });
      }
    },
    async onLogin() {
      await this.$store.dispatch("signUserIn", this.formDataLogin);
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$router.push(this.localePath("/"));
      }
    }
  },
  head() {
    return {
      title: this.$t("join.head.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("join.head.content")
        }
      ]
    };
  }
};
</script>

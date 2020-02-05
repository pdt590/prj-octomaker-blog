<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <!-- Signup form -->
        <form v-show="isSignup">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-size-4">Đăng ký</p>
            </header>
            <div class="card-content">
              <b-field
                label="Username"
                :type="$v.formDataSignup.username.$error ? `is-danger` : ``"
                :message="!$v.formDataSignup.username.minlen ? `At least 6 characters` : ``"
              >
                <b-input
                  type="text"
                  v-model.trim="formDataSignup.username"
                  @blur="$v.formDataSignup.username.$touch()"
                  placeholder="Nhập username"
                ></b-input>
              </b-field>

              <b-field
                label="Email"
                :type="$v.formDataSignup.email.$error ? `is-danger` : ``"
                :message="!$v.formDataSignup.email.email ? `Invalid email` : ``"
              >
                <b-input
                  type="email"
                  v-model.trim="formDataSignup.email"
                  @blur="$v.formDataSignup.email.$touch()"
                  placeholder="Nhập email"
                ></b-input>
              </b-field>

              <b-field
                label="Password"
                :type="$v.formDataSignup.password.$error ? `is-danger` : ``"
                :message="!$v.formDataSignup.password.minlen ? `At least 6 characters` : ``"
              >
                <b-input
                  type="password"
                  v-model.trim="formDataSignup.password"
                  @blur="$v.formDataSignup.password.$touch()"
                  password-reveal
                  placeholder="Nhập mật khẩu"
                ></b-input>
              </b-field>

              <!-- <b-checkbox>Remember me</b-checkbox> -->
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <a @click.prevent="isSignup = !isSignup">{{ isSignup ? `Đăng nhập?` : `Đăng ký?` }}</a>
                <button
                  class="button is-info"
                  :class="{ 'is-loading': authLoading }"
                  :disabled="$v.formDataSignup.$invalid"
                  @click.prevent="onSignup"
                >Đăng ký</button>
              </div>
            </footer>
          </div>
        </form>
        <!-- Login form -->
        <form v-show="!isSignup">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-size-4">Đăng nhập</p>
            </header>
            <div class="card-content">
              <b-field
                label="Email"
                :type="$v.formDataLogin.email.$error ? `is-danger` : ``"
                :message="!$v.formDataLogin.email.email ? `Invalid email` : ``"
              >
                <b-input
                  type="email"
                  v-model.trim="formDataLogin.email"
                  @blur="$v.formDataLogin.email.$touch()"
                  placeholder="Nhập Email"
                ></b-input>
              </b-field>

              <b-field
                label="Password"
                :type="$v.formDataLogin.password.$error ? `is-danger` : ``"
                :message="!$v.formDataLogin.password.minlen ? `At least 6 characters` : ``"
              >
                <b-input
                  type="password"
                  v-model.trim="formDataLogin.password"
                  @blur="$v.formDataLogin.password.$touch()"
                  password-reveal
                  placeholder="Nhập mật khẩu"
                ></b-input>
              </b-field>

              <!-- <b-checkbox>Remember me</b-checkbox> -->
            </div>
            <footer class="card-footer" style="border-top: none">
              <div class="card-footer-item">
                <p>
                  <a
                    @click.prevent="isSignup = !isSignup"
                  >{{ isSignup ? `Đăng nhập?` : `Đăng ký?` }}</a>
                  /
                  <nuxt-link to="/user/resetpassword">Quên mật khẩu?</nuxt-link>
                </p>
                <button
                  class="button is-info"
                  :class="{ 'is-loading': authLoading }"
                  :disabled="$v.formDataLogin.$invalid"
                  @click.prevent="onLogin"
                >Đăng nhập</button>
              </div>
            </footer>
          </div>
        </form>
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
        this.$router.push("/");
        this.$buefy.toast.open({
          duration: 3000,
          message: "Kiểm tra hộp thư để kích hoạt tài khoản",
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
        this.$router.push("/");
      }
    }
  },
  head() {
    return {
      title: "Đăng nhập/Đăng ký",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Đăng nhập-Đăng ký"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 2rem;
  .card-footer .card-footer-item {
    justify-content: space-between;
  }
}
</style>

<template>
  <div>
    <!-- Start login -->
    <form class="modal-card" v-show="!isSignup">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("modal_join.login.title") }}</p>
      </header>
      <section class="modal-card-body">
        <b-field
          label="Email"
          :type="$v.formDataLogin.email.$error ? `is-danger` : ``"
          :message="
            !$v.formDataLogin.email.email
              ? $t('modal_join.login.email_message')
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
              ? $t('modal_join.login.password_message')
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
      </section>
      <footer class="modal-card-foot" style="justify-content: space-between">
        <p>
          <a @click.prevent="isSignup = !isSignup">
            {{
              isSignup
                ? $t("modal_join.login.login_text")
                : $t("modal_join.signup.signup_text")
            }}
          </a>
          <br />
          <a @click.prevent="onForgetPassword">{{
            $t("modal_join.login.forget_password_link")
          }}</a>
        </p>
        <div class="buttons">
          <button class="button is-info is-outlined" @click.prevent="$parent.close()">
            {{ $t("modal_join.login.close_btn") }}
          </button>
          <button
            class="button is-info is-outlined"
            :class="{ 'is-loading': authLoading }"
            :disabled="$v.formDataLogin.$invalid"
            @click.prevent="onLogin"
          >
            {{ $t("modal_join.login.login_btn") }}
          </button>
        </div>
      </footer>
    </form>
    <!-- End login -->
    <!-- Start signup -->
    <form class="modal-card" v-show="isSignup">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("modal_join.signup.title") }}</p>
      </header>
      <section class="modal-card-body">
        <b-field
          label="Username"
          :type="$v.formDataSignup.username.$error ? `is-danger` : ``"
          :message="
            !$v.formDataSignup.username.minlen
              ? $t('modal_join.signup.username_message')
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
              ? $t('modal_join.signup.email_message')
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
              ? $t('modal_join.signup.password_message')
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
      </section>
      <footer class="modal-card-foot" style="justify-content: space-between">
        <a @click.prevent="isSignup = !isSignup">
          {{
            isSignup
              ? $t("modal_join.login.login_text")
              : $t("modal_join.signup.signup_text")
          }}
        </a>
        <div class="buttons">
          <button class="button is-info is-outlined" @click.prevent="$parent.close()">
            {{ $t("modal_join.signup.close_btn") }}
          </button>
          <button
            class="button is-info is-outlined"
            :class="{ 'is-loading': authLoading }"
            :disabled="$v.formDataSignup.$invalid"
            @click.prevent="onSignup"
          >
            {{ $t("modal_join.signup.signup_btn") }}
          </button>
        </div>
      </footer>
    </form>
    <!-- End signup -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { authMessage } from "~/libs/helpers";

export default {
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
        this.$parent.close();
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("modal_join.signup.toast.message"),
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
        this.$parent.close();
      }
    },
    onForgetPassword() {
      this.$parent.close();
      this.$router.push(this.localePath("/user/resetpassword"));
    }
  }
};
</script>

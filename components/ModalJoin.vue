<template>
  <section>
    <!-- Start login -->
    <div class="modal-card" v-show="!isSignup">
      <header class="modal-card-head">
        <p class="modal-card-title">Đăng nhập</p>
      </header>
      <section class="modal-card-body">
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
          :message="
            !$v.formDataLogin.password.minlen ? `At least 6 characters` : ``
          "
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
      </section>
      <footer class="modal-card-foot" style="justify-content: space-between">
        <p>
          <a @click="isSignup = !isSignup">
            {{ isSignup ? `Đăng nhập?` : `Đăng ký?` }}
          </a>
          <br>
          <a @click="onForgetPassword">Quên mật khẩu?</a>
        </p>
        <div class="buttons">
          <button class="button is-info is-outlined" @click="$parent.close()">
            Close
          </button>
          <button
            class="button is-info is-outlined"
            :class="{ 'is-loading': authLoading }"
            :disabled="$v.formDataLogin.$invalid"
            @click="onLogin"
          >
            Đăng nhập
          </button>
        </div>
      </footer>
    </div>
    <!-- End login -->
    <!-- Start signup -->
    <div class="modal-card" v-show="isSignup">
      <header class="modal-card-head">
        <p class="modal-card-title">Đăng ký</p>
      </header>
      <section class="modal-card-body">
        <b-field
          label="Username"
          :type="$v.formDataSignup.username.$error ? `is-danger` : ``"
          :message="
            !$v.formDataSignup.username.minlen ? `At least 6 characters` : ``
          "
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
          :message="
            !$v.formDataSignup.password.minlen ? `At least 6 characters` : ``
          "
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
      </section>
      <footer class="modal-card-foot" style="justify-content: space-between">
        <a @click="isSignup = !isSignup">
          {{ isSignup ? `Đăng nhập?` : `Đăng ký?` }}
        </a>
        <div class="buttons">
          <button class="button is-info is-outlined" @click="$parent.close()">
            Close
          </button>
          <button
            class="button is-info is-outlined"
            :class="{ 'is-loading': authLoading }"
            :disabled="$v.formDataSignup.$invalid"
            @click="onSignup"
          >
            Đăng ký
          </button>
        </div>
      </footer>
    </div>
    <!-- End signup -->
  </section>
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
        this.$parent.close();
      }
    },
    onForgetPassword() {
      this.$parent.close();
      this.$router.push("/user/resetpassword");
    }
  }
};
</script>

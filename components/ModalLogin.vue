<template>
  <form class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_login.title") }}</p>
    </header>
    <section class="modal-card-body">
      <b-field
        label="Email"
        :type="$v.formData.email.$error ? `is-danger` : ``"
        :message="
          !$v.formData.email.email ? $t('modal_login.email_message') : ``
        "
      >
        <b-input
          type="email"
          v-model.trim="formData.email"
          @blur="$v.formData.email.$touch()"
        ></b-input>
      </b-field>

      <b-field
        label="Password"
        :type="$v.formData.password.$error ? `is-danger` : ``"
        :message="
          !$v.formData.password.minlen ? $t('modal_login.password_message') : ``
        "
      >
        <b-input
          type="password"
          v-model.trim="formData.password"
          @blur="$v.formData.password.$touch()"
          password-reveal
        ></b-input>
      </b-field>
      <!-- <b-checkbox>Remember me</b-checkbox> -->
    </section>
    <footer class="modal-card-foot" style="justify-content: space-between">
      <a @click.prevent="onForgetPassword">{{
        $t("modal_login.forget_password_link")
      }}</a>
      <div class="buttons">
        <button
          class="button is-info is-outlined"
          @click.prevent="$parent.close()"
        >
          {{ $t("modal_login.close_btn") }}
        </button>
        <button
          class="button is-info is-outlined"
          :class="{ 'is-loading': authLoading }"
          :disabled="$v.formData.$invalid"
          @click.prevent="onLogin"
        >
          {{ $t("modal_login.login_btn") }}
        </button>
      </div>
    </footer>
  </form>
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
      formData: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    formData: {
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
    async onLogin() {
      await this.$store.dispatch("signUserIn", this.formData);
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

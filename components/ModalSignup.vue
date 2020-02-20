<template>
  <form class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_signup.title") }}</p>
    </header>
    <section class="modal-card-body">
      <b-field
        label="Username"
        :type="$v.formData.username.$error ? `is-danger` : ``"
        :message="
          !$v.formData.username.minlen
            ? $t('modal_signup.username_message')
            : ``
        "
      >
        <b-input
          type="text"
          v-model.trim="formData.username"
          @blur="$v.formData.username.$touch()"
        ></b-input>
      </b-field>

      <b-field
        label="Email"
        :type="$v.formData.email.$error ? `is-danger` : ``"
        :message="
          !$v.formData.email.email ? $t('modal_signup.email_message') : ``
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
          !$v.formData.password.minlen
            ? $t('modal_signup.password_message')
            : ``
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
    <footer class="modal-card-foot">
      <button
        class="button is-info is-outlined"
        @click.prevent="$parent.close()"
      >
        {{ $t("modal_signup.close_btn") }}
      </button>
      <button
        class="button is-info is-outlined"
        :class="{ 'is-loading': authLoading }"
        :disabled="$v.formData.$invalid"
        @click.prevent="onSignup"
      >
        {{ $t("modal_signup.signup_btn") }}
      </button>
    </footer>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { authMessage } from "~/libs/helpers";

export default {
  name: "modal-signup",
  computed: {
    ...mapGetters(["authError", "authLoading"])
  },
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  validations: {
    formData: {
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
    }
  },
  methods: {
    async onSignup() {
      await this.$store.dispatch("signUserUp", this.formData);
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
          message: this.$t("modal_signup.toast.message"),
          type: "is-warning"
        });
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <form class="card _card-input">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              {{ $t("resetpassword.title") }}
            </p>
          </header>
          <div class="card-content">
            <b-field
              label="Email"
              :type="$v.formData.email.$error ? `is-danger` : ``"
              :message="
                !$v.formData.email.email
                  ? $t('resetpassword.email_message')
                  : ``
              "
            >
              <b-input
                type="email"
                v-model.trim="formData.email"
                @blur="$v.formData.email.$touch()"
                :placeholder="$t('resetpassword.email_placeholder')"
              ></b-input>
            </b-field>
          </div>
          <footer class="card-footer" style="border-top: none">
            <div class="card-footer-item">
              <button
                class="button is-info is-outlined"
                :class="{ 'is-loading': authLoading }"
                :disabled="$v.formData.$invalid"
                @click.prevent="onResetPassword"
              >
                {{ $t("resetpassword.retrieve_btn") }}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
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
      formData: {
        email: null
      }
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    async onResetPassword() {
      await this.$store.dispatch("resetUserPassword", this.formData.email);
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("resetpassword.toast.message"),
          type: "is-warning"
        });
        this.$router.push(this.localePath("/user/join"));
      }
    }
  },
  head() {
    return {
      title: this.$t("resetpassword.head.title")
    };
  }
};
</script>

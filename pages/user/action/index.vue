<template>
  <div class="container">
    <!-- Start resetPassword -->
    <div class="columns" v-if="mode === 'resetPassword'">
      <div class="column is-4 is-offset-4">
        <form class="card _card-input">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              {{ $t("action.reset_password.title") }}
            </p>
          </header>
          <div class="card-content">
            <b-field
              :label="$t('action.reset_password.new_password.label')"
              :type="$v.formData.newPassword.$error ? `is-danger` : ``"
              :message="
                !$v.formData.newPassword.minlen
                  ? $t('action.reset_password.new_password.message')
                  : ``
              "
            >
              <b-input
                type="password"
                v-model.trim="formData.newPassword"
                @blur="$v.formData.newPassword.$touch()"
                password-reveal
              ></b-input>
            </b-field>
            <b-field
              :label="$t('action.reset_password.confirm_new_password.label')"
              :type="$v.formData.confirmNewPassword.$error ? `is-danger` : ``"
              :message="
                !$v.formData.confirmNewPassword.minlen
                  ? $t('action.reset_password.confirm_new_password.message')
                  : $v.formData.confirmNewPassword.$error
                  ? $t(
                      'action.reset_password.confirm_new_password.error_message'
                    )
                  : ``
              "
            >
              <b-input
                type="password"
                v-model.trim="formData.confirmNewPassword"
                @blur="$v.formData.confirmNewPassword.$touch()"
                password-reveal
              ></b-input>
            </b-field>
          </div>
          <footer class="card-footer" style="border-top: none; padding: 0.5rem">
            <div class="card-footer-item">
              <button
                class="button is-info is-outlined"
                :class="{ 'is-loading': authLoading }"
                :disabled="$v.formData.$invalid"
                @click.prevent="onResetPassword"
              >
                {{ $t("action.reset_password.send_btn") }}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
    <!-- End resetPassword -->
    <!-- Start verifyEmail -->
    <div
      class="_center_view"
      v-else-if="mode === 'verifyEmail' && isSuccess !== null"
    >
      <b-message type="is-success" has-icon size="is-large" v-if="isSuccess">
        {{ $t("action.verify_email.success_message") }}
        <br />
        <nuxt-link :to="localePath('/')">{{
          $t("action.verify_email.login_link")
        }}</nuxt-link>
      </b-message>

      <b-message type="is-danger" has-icon size="is-large" v-else>
        {{ $t("action.verify_email.error_message") }}
        <br />
        <nuxt-link :to="localePath('/user/join')">{{
          $t("action.verify_email.home_link")
        }}</nuxt-link>
      </b-message>
    </div>
    <!-- End verifyEmail -->
    <!-- Start recoverEmail -->
    <div
      class="_center_view"
      v-else-if="mode === 'recoverEmail' && isSuccess !== null"
    >
      <b-message type="is-success" has-icon size="is-large" v-if="isSuccess">
        {{ $t("action.recover_email.success_message") }}
        <br />
        {{ $t("action.recover_email.announce_message") }}
      </b-message>

      <b-message type="is-danger" has-icon size="is-large" v-else>
        {{ $t("action.recover_email.error_message") }}
        <br />
        <nuxt-link :to="localePath('/')">{{
          $t("action.recover_email.home_link")
        }}</nuxt-link>
      </b-message>
    </div>
    <!-- End recoverEmail -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  layout: "empty",
  validate({ store }) {
    const user = store.getters.user;
    return user && user.isActive ? false : true;
  },
  async mounted() {
    if (this.mode === "verifyEmail") {
      this.isSuccess = await this.$store.dispatch(
        "handleVerifyEmail",
        this.actionCode
      );
    } else if (this.mode === "recoverEmail") {
      this.isSuccess = await this.$store.dispatch(
        "handleRecoverEmail",
        this.actionCode
      );
    }
  },
  computed: {
    ...mapGetters(["user", "authLoading"]),
    mode() {
      return this.$route.query.mode;
    },
    actionCode() {
      return this.$route.query.oobCode;
    },
    apiKey() {
      return this.$route.query.apiKey;
    },
    lang() {
      return this.$route.query.lang;
    }
  },
  data() {
    return {
      formData: {
        newPassword: null,
        confirmNewPassword: null
      },
      isSuccess: null
    };
  },
  validations: {
    formData: {
      newPassword: {
        required,
        minlen: minLength(6)
      },
      confirmNewPassword: {
        required,
        minlen: minLength(6),
        isValidPassword: sameAs("newPassword")
      }
    }
  },
  methods: {
    async onResetPassword() {
      await this.$store.dispatch("handleResetPassword", {
        actionCode: this.actionCode,
        newPassword: this.formData.newPassword
      });
      if (this.authLoading) {
        this.$store.commit("setAuthLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "[auth] error",
          type: "is-danger"
        });
      } else {
        this.$router.push(this.localePath("/user/join"));
        this.$buefy.toast.open({
          duration: 3000,
          message: this.$t("action.reset_password.toast.message"),
          type: "is-success"
        });
      }
    }
  },
  head() {
    return {
      title: this.$t("action.head.title")
    };
  }
};
</script>

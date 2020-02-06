<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <form>
          <div class="card" style="margin-top: 2rem">
            <header class="card-header">
              <p class="card-header-title is-size-4">Yêu cầu đổi mật khẩu</p>
            </header>
            <div class="card-content">
              <b-field
                label="Email"
                :type="$v.formData.email.$error ? `is-danger` : ``"
                :message="!$v.formData.email.email ? `Invalid email`: ``"
              >
                <b-input
                  type="email"
                  v-model.trim="formData.email"
                  @blur="$v.formData.email.$touch()"
                  placeholder="Nhập email đã đăng ký tài khoản"
                ></b-input>
              </b-field>
            </div>
            <footer class="card-footer" style="border-top: none">
              <div class="card-footer-item">
                <button
                  class="button is-info"
                  :class="{ 'is-loading': authLoading }"
                  :disabled="$v.formData.$invalid"
                  @click.prevent="onResetPassword"
                >Send</button>
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
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Kiểm tra hộp thư để thiết lập lại mật khẩu",
          type: "is-warning"
        });
        this.$router.push("/user/join");
      }
    }
  }
};
</script>
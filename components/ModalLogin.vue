<template>
  <div>
    <form>
      <div class="modal-card v-modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Đăng nhập</p>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Email"
            :type="$v.formData.email.$error ? `is-danger` : ``"
            :message="!$v.formData.email.email ? `Invalid email` : ``"
          >
            <b-input
              type="email"
              v-model.trim="formData.email"
              @blur="$v.formData.email.$touch()"
              placeholder="Nhập Email"
            ></b-input>
          </b-field>

          <b-field
            label="Password"
            :type="$v.formData.password.$error ? `is-danger` : ``"
            :message="!$v.formData.password.minlen ? `At least 6 characters` : ``"
          >
            <b-input
              type="password"
              v-model.trim="formData.password"
              @blur="$v.formData.password.$touch()"
              password-reveal
              placeholder="Nhập mật khẩu"
            ></b-input>
          </b-field>

          <!-- <b-checkbox>Remember me</b-checkbox> -->
        </section>
        <footer class="modal-card-foot" style="justify-content: space-between">
          <a @click="onFgPassword">Quên mật khẩu?</a>
          <div class="buttons">
            <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
            <button
              class="button is-info is-rounded"
              :class="{ 'is-loading': authLoading }"
              :disabled="$v.formData.$invalid"
              @click.prevent="onLogin"
            >Đăng nhập</button>
          </div>
        </footer>
      </div>
    </form>
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
    onFgPassword() {
      this.$parent.close();
      this.$router.push("/user/resetpassword");
    }
  }
};
</script>

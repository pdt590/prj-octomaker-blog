<template>
  <div>
    <form>
      <div class="modal-card v-modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Đăng ký</p>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Username*"
            :type="$v.formData.username.$error ? `is-danger` : ``"
            :message="!$v.formData.username.minlen ? `Tối thiểu 6 kí tự` : ``"
          >
            <b-input
              type="text"
              v-model.trim="formData.username"
              @blur="$v.formData.username.$touch()"
              placeholder="Nhập username"
            ></b-input>
          </b-field>

          <b-field
            label="Email*"
            :type="$v.formData.email.$error || !response ? `is-danger` : ``"
            :message="!$v.formData.email.email || !response ? `Nhập email hợp lệ` : ``"
          >
            <b-input
              type="email"
              v-model.trim="formData.email"
              @blur="$v.formData.email.$touch()"
              placeholder="Nhập email"
            ></b-input>
          </b-field>

          <b-field
            label="Password*"
            :type="$v.formData.password.$error ? `is-danger` : ``"
            :message="!$v.formData.password.minlen ? `Tối thiểu 6 kí tự` : ``"
          >
            <b-input
              type="password"
              v-model.trim="formData.password"
              @blur="$v.formData.password.$touch()"
              password-reveal
              placeholder="Nhập mật khẩu"
            ></b-input>
          </b-field>

          <b-checkbox>Remember me</b-checkbox>
        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end">
          <button class="button is-rounded" type="button" @click="$parent.close()">Close</button>
          <button
            class="button is-info is-rounded"
            :class="{'is-loading': authLoading}"
            :disabled="$v.formData.$invalid"
            @click.prevent="onSignup"
          >Đăng ký</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import { authMessage } from "~/plugins/util-helpers";

export default {
  computed: {
    ...mapGetters(["authError", "authLoading"])
  },
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: ""
      },
      response: true
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
      this.response = await this.$store.dispatch("signUserUp", this.formData);
      if (this.response) {
        this.$parent.close();
        this.$buefy.toast.open({
          duration: 3000,
          message: "Kiểm tra hộp thư để kích hoạt tài khoản",
          type: "is-warning"
        });
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: authMessage(this.authError),
          type: "is-danger"
        });
      }
    }
  }
};
</script>
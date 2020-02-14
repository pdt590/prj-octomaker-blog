<template>
  <section>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Insert Link</p>
      </header>
      <section class="modal-card-body">
        <b-field
          :type="$v.link.$error ? `is-danger` : ``"
          :message="$v.link.$error ? `Invalid URL` : ``"
        >
          <b-input
            icon="link"
            v-model.trim="link"
            @blur="$v.link.$touch()"
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot" style="justify-content: flex-end">
        <div class="buttons">
          <button class="button is-info is-outlined" @click="$parent.close()">
            Close
          </button>
          <button class="button is-info is-outlined" :disabled="$v.link.$invalid" @click="onInsert">
            Insert
          </button>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { required, url } from "vuelidate/lib/validators";
import { authMessage } from "~/libs/helpers";

export default {
  data() {
    return {
      link: null
    };
  },
  validations: {
    link: {
      required,
      url
    }
  },
  methods: {
    onInsert() {
      this.$parent.close();
      this.$emit("insert", this.link);
    }
  }
};
</script>

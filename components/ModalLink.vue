<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_link.title") }}</p>
    </header>
    <section class="modal-card-body">
      <b-field
        :type="$v.link.$error ? `is-danger` : ``"
        :message="$v.link.$error ? $t('modal_link.link_message') : ``"
      >
        <b-input
          type="text"
          v-model.trim="link"
          @blur="$v.link.$touch()"
          icon="link"
        ></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button is-info is-outlined" @click="$parent.close()">
          {{ $t("modal_link.close_btn") }}
        </button>
        <button
          class="button is-info is-outlined"
          :disabled="$v.link.$invalid"
          @click="onDraw"
        >
          {{ $t("modal_link.insert_btn") }}
        </button>
      </div>
    </footer>
  </div>
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
    onDraw() {
      this.$parent.close();
      this.$emit("draw", this.link);
    }
  }
};
</script>

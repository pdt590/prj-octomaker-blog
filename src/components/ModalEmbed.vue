<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_embed.title") }}</p>
    </header>
    <section class="modal-card-body">
      <b-field
        :type="$v.link.$error ? `is-danger` : ``"
        :message="$v.link.$error ? $t('modal_embed.link_message') : ``"
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
          {{ $t("modal_embed.close_btn") }}
        </button>
        <button
          class="button is-info is-outlined"
          :disabled="$v.link.$invalid"
          @click="onDraw"
        >
          {{ $t("modal_embed.insert_btn") }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, url } from "vuelidate/lib/validators";
import { isEmbedURL } from "~/libs/helpers";

export default {
  name: "v-modal-embed",
  data() {
    return {
      link: null
    };
  },
  validations: {
    link: {
      required,
      url,
      isEmbedURL
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

<template>
  <section>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Insert Embed</p>
      </header>
      <section class="modal-card-body">
        <b-field
          :type="$v.link.$error ? `is-danger` : ``"
          :message="
            $v.link.$error
              ? `Invalid URL - Accept Youtube, Vimeo, Slideshare, Codepen, Gist, JsFiddle, GoogleSlide, Soundcloud`
              : ``
          "
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
          <button
            class="button is-info is-outlined"
            @click="$parent.close()"
          >
            Close
          </button>
          <button
            class="button is-info is-outlined"
            :disabled="$v.link.$invalid"
            @click="onDraw"
          >
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
import { isEmbedURL } from "~/libs/helpers";

export default {
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

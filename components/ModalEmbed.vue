<template>
  <div>
    <form>
      <div class="modal-card v-modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Insert Embed</p>
        </header>
        <section class="modal-card-body">
          <b-field 
          :type="$v.link.$error ? `is-danger` : ``" 
          :message="$v.link.$error ? `Invalid URL - Accept Youtube, Vimeo, Slideshare, Codepen, Gist, JsFiddle, GoogleSlide, Soundcloud` : ``">
            <b-input icon="link" v-model.trim="link" @blur="$v.link.$touch()"></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot" style="justify-content: space-between">
          <div class="buttons">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button
              class="button"
              :disabled="$v.link.$invalid"
              @click.prevent="onInsert"
            >Insert</button>
          </div>
        </footer>
      </div>
    </form>
  </div>
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
    onInsert() {
      this.$parent.close();
      this.$emit("insert", this.link);
    }
  }
};
</script>

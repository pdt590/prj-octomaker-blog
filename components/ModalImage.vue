<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Upload Image</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <!-- Upload Image -->
        <div class="level">
          <div class="level-item">
            <b-upload v-model="images" @input="onAdd" :loading="postLoading" drag-drop multiple>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
        </div>
        <!--  -->
      </b-field>
      <div class="columns is-variable is-multiline is-mobile" style="margin-top: 0.1rem">
        <div class="column is-one-quarter" v-for="(file, index) in previewImages" :key="index">
          <figure class="image is-128x128 v-image-frame" style="cursor: pointer;">
            <img
              class="v-preview-image"
              :src="file.url"
              :alt="`image_${index}`"
              @click="onSelect(index)"
            />
            <a class="delete v-image-bndelete" @click="onDelete(index)"></a>
          </figure>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-rounded"
        type="button"
        @click="$parent.close()"
        style="justify-content: flex-end;"
      >Close</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy } from "~/libs/helpers";
import { maxLength } from "vuelidate/lib/validators";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.previewImages = deepCopy(this.value);
  },
  computed: {
    ...mapGetters(["postLoading"])
  },
  data() {
    return {
      images: [],
      previewImages: []
    };
  },
  methods: {
    async onAdd() {
      const uniqueImages = this.images.filter(
        image =>
          !this.previewImages.some(item => item.metadata.orgName === image.name)
      );
      await this.$store.dispatch("addPostImage", uniqueImages);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onAdd() Error",
          type: "is-danger"
        });
      } else {
        this.previewImages = deepCopy(this.value);
        this.images = []; // Very important in the case of multible mode of b-upload
      }
    },
    async onDelete(index) {
      await this.$store.dispatch("deletePostImage", this.previewImages[index]);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onDelete() Error",
          type: "is-danger"
        });
      } else {
        this.previewImages = deepCopy(this.value);
      }
    },
    onSelect(index) {
      this.$emit("select", this.previewImages[index]);
    }
  }
};
</script>

<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Upload Images</p>
    </header>
    <section class="modal-card-body">
      <b-field
        :type="$v.images.$invalid ? `is-danger` : ``"
        :message="!$v.images.isImg ? `Image invalid` : ``"
      >
        <!-- Upload Image -->
        <div class="level">
          <div class="level-item">
            <b-upload
              v-model="images"
              @input="onAdd"
              :disabled="!$v.images.isImg || images.length == 4"
              :loading="postLoading"
              drag-drop
              multiple
            >
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
      <div class="columns is-variable is-1 is-mobile" style="margin-top: 0.1rem">
        <div class="column is-3" v-for="(file, index) in previewImages" :key="index">
          <figure class="image is-128x128 v-image-frame" style="cursor: pointer;">
            <img
              class="v-preview-image"
              :src="file.url"
              :alt="`image_${index}`"
              @click="onSelect(index)"
            />
            <span class="v-image-size">{{ file.metadata.size | fmBytes }}</span>
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
import { isImage, deepCopy } from "~/libs/helpers";
import { maxLength } from "vuelidate/lib/validators";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.previewImages = [...this.value]; // TODO Should use deepCopy ?
    //this.previewImages = deepCopy(this.value);
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
  validations: {
    images: {
      maxLen: maxLength(4),
      isImg: isImage
    }
  },
  methods: {
    async onAdd() {
      const uploadedImages = await this.$store.dispatch(
        "addPostImage",
        this.images
      );
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onAdd() Error",
          type: "is-danger"
        });
      } else {
        //this.previewImages = [...this.value]; // solution 01 - update previewImages from loadedPost.images
        //this.previewImages = deepCopy(this.value);
        this.previewImages = [...this.previewImages, ...uploadedImages]; // solution 02 - update previewImages directly
        this.images = []; // Very important on the case of multible mode of b-upload
      }
      // TODO Fix duplicated image issue
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
        //this.previewImages = [...this.value]; // solution 01 - update previewImages from loadedPost.images
        this.previewImages = deepCopy(this.value);
        //this.previewImages.splice(index, 1); // solution 02 - update previewImages directly
      }
    },
    onSelect(index) {
      this.$emit("select", this.previewImages[index]);
    }
  }
};
</script>

<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("modal_image.title") }}</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <!-- Start image upload -->
        <div class="level">
          <div class="level-item">
            <b-upload
              v-model="images"
              @input="onAdd"
              :loading="postLoading"
              drag-drop
              multiple
              :accept="acceptedImages"
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>{{ $t("modal_image.placeholder") }}</p>
                </div>
              </section>
            </b-upload>
          </div>
        </div>
        <!-- End image upload -->
      </b-field>
      <div class="columns is-variable is-multiline" style="margin-top: 0.1rem">
        <div
          class="column is-one-quarter"
          v-for="(file, index) in previewImages"
          :key="index"
        >
          <figure class="_image-frame" style="cursor: pointer;">
            <client-only>
              <img
                class="_image-preview"
                v-lazy="file.url"
                style="display: none"
                onload="this.style.display = 'block'"
                :alt="`image_${index}`"
                @click="onSelect(index)"
              />
            </client-only>
            <a class="delete _image-button-delete" @click="onDelete(index)"></a>
          </figure>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-info is-outlined" @click="$parent.close()">
        {{ $t("modal_image.close_btn") }}
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy, acceptedImages } from "~/libs/helpers";

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
      acceptedImages: acceptedImages,
      images: [],
      previewImages: []
    };
  },
  methods: {
    async onAdd() {
      const uniqueImages = this.images.filter(
        // Check duplicate images
        image =>
          !this.previewImages.some(item => item.metadata.orgName === image.name)
      );
      if (!uniqueImages.length) {
        return;
      }
      await this.$store.dispatch(
        "addCompressedPostImage",
        uniqueImages.reverse()
      );
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

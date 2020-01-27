<template>
  <div class="container">
    <form>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-size-4">Tạo bài viết</p>
        </header>
        <div class="card-content">
          <!-- Post info -->
          <b-field
            label="Title"
            expanded
            :type="$v.postData.title.$error ? `is-danger` : ``"
          >
            <b-input
              type="text"
              v-model.trim="postData.title"
              @blur="$v.postData.title.$touch()"
              icon="store"
            >
            </b-input>
          </b-field>

          <b-field label="Danh mục">
            <b-select v-model="postData.category" expanded>
              <option
                v-for="(category, i) in categories"
                :key="i"
                :value="category.id"
                >{{ category.name }}</option
              >
            </b-select>
          </b-field>

          <b-field
            label="Nội dung"
            :type="$v.postData.content.$error ? `is-danger` : ``"
          >
            <client-only>
              <mavon-editor
                :toolbars="markdownOption"
                v-model="handbook"
                language="en"
              />
            </client-only>
          </b-field>

          <!-- Image upload -->
          <!-- <b-field
            label="Ảnh sản phẩm"
            :type="!$v.postData.images.isImg ? `is-danger` : ``"
            :message="
              !$v.postData.images.isImg ? `File ảnh không hợp lệ` : ``
            "
          >
            <div class="level">
              <div class="level-item">
                <b-upload
                  v-model="postData.images"
                  @input="onFileChange"
                  multiple
                  :disabled="
                    !$v.postData.images.isImg || postData.images.length == 4
                  "
                  drag-drop
                >
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"> </b-icon>
                      </p>
                      <p>Upload ảnh cho sản phẩm</p>
                    </div>
                  </section>
                </b-upload>
              </div>
            </div>
          </b-field>
          <div class="level" style="justify-content: center;">
            <div
              class="level-item"
              style="flex-grow: 0.1; padding-bottom: 1rem"
              v-for="(file, index) in previewImages"
              :key="index"
            >
              <figure class="image is-128x128 v-image-frame">
                <img
                  class="v-preview-image"
                  :src="file.url"
                  :alt="`item_image_${index}`"
                />
                <span class="v-image-size">{{ file.size | fmBytes }}</span>
                <a
                  class="delete v-image-bndelete"
                  @click="
                    previewImages.splice(index, 1);
                    postData.images.splice(index, 1);
                  "
                ></a>
              </figure>
            </div>
          </div> -->
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <button
              class="button is-info is-rounded"
              :class="{ 'is-loading': postLoading }"
              :disabled="$v.postData.$invalid"
              type="submit"
              @click.prevent="onAddPost"
            >
              Tạo bài viết
            </button>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isImage } from "~/plugins/util-helpers";
import { categories } from "~/plugins/util-lists";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  //middleware: ["server-client-auth", "server-client-edit-auth"],
  computed: {
    ...mapGetters(["postLoading"])
  },
  data() {
    return {
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      },
      handbook: "#### how to use mavonEditor in nuxt.js",

      categories: categories,
      postData: {
        title: null,
        category: "iot",
        content: '``` \nconsole.log("lalala") \n```',
        images: []
      },
      previewImages: []
    };
  },
  validations: {
    postData: {
      title: {
        required
      },
      category: {
        required
      },
      content: {
        required
      },
      images: {
        required,
        maxLen: maxLength(5),
        isImg: isImage
      }
    }
  },
  methods: {
    async onAddPost() {
      const postUrl = await this.$store.dispatch("addPost", this.postData);
      this.$router.push(`/posts/${postUrl}`);
    },
    onFileChange() {
      this.previewImages = [];
      for (let file of this.postData.images) {
        this.previewImages.push({
          url: URL.createObjectURL(file),
          size: file.size
        });
      }
    }
  },
  head() {
    return {
      title: "Tạo bài viết",
      meta: [
        { hid: "description", name: "description", content: "Tạo bài viết" }
      ]
    };
  }
};
</script>

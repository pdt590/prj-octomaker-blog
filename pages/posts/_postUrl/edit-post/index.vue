<template>
  <div class="container">
    <form>
      <!-- Post info -->
      <b-field label="Title" expanded :type="$v.postTitle.$error ? `is-danger` : ``">
        <b-input
          type="text"
          v-model.trim="postTitle"
          @blur="onChangeTitle"
          icon="post-outline"
          :loading="titleLoading"
        ></b-input>
      </b-field>

      <b-field label="Danh mục">
        <b-select v-model="postContent.category" expanded :disabled="$v.postTitle.$invalid">
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
          >{{ category.name }}</option>
        </b-select>
      </b-field>

      <!-- simpleMDE -->
      <b-field label="Nội dung">
        <client-only placeholder="Loading ...">
          <vue-simplemde ref="markdownEditor" :configs="configs" v-model="postContent.markdown" />
        </client-only>
      </b-field>
      <!--  -->

      <div class="block">
        <b-radio
          v-model="postContent.mode"
          native-value="public"
          :disabled="$v.postTitle.$invalid"
        >Public</b-radio>
        <b-radio
          v-model="postContent.mode"
          native-value="private"
          :disabled="$v.postTitle.$invalid"
        >Private</b-radio>
      </div>

      <button
        class="button is-info is-rounded"
        :class="{ 'is-loading': postLoading }"
        :disabled="$v.postTitle.$invalid"
        type="submit"
        @click.prevent="onPublish"
      >Update</button>
      <button
        class="button is-info is-rounded"
        :disabled="$v.postTitle.$invalid"
        type="submit"
        @click.prevent="isModalConfirmActive = true"
      >Delete</button>
    </form>

    <!-- Modal -->
    <b-modal :active.sync="isModalLinkActive" has-modal-card>
      <v-modal-link @insert="onInsertLink" />
    </b-modal>
    <b-modal :active.sync="isModalImageActive" has-modal-card>
      <v-modal-image :value="postImages" @select="onSelectImage" />
    </b-modal>
    <b-modal :active.sync="isModalEmbedActive" has-modal-card>
      <v-modal-embed @insert="onInsertEmbed" />
    </b-modal>
    <b-modal :active.sync="isModalConfirmActive" has-modal-card>
      <v-modal-confirm @delete="onDelete" />
    </b-modal>
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isImage, deepCopy } from "~/libs/helpers";
import { categories } from "~/libs/lists";
import {
  required,
  email,
  url,
  numeric,
  sameAs,
  not,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  middleware: ["server-client-auth", "server-client-edit-permission"],
  mounted() {
    this.postTitle = this.loadedPost.title;

    this.postContent = {
      category: this.loadedPost.category,
      mode: this.loadedPost.mode,
      markdown: this.loadedPost.markdown,
      html: this.loadedPost.html
    };
  },
  async fetch({ store, params, error }) {
    await store.dispatch("loadPost", params.postUrl);
    if (store.getters.postLoading) {
      store.commit("setPostLoading", false);
      error({ statusCode: 500, message: "loadPost() Error" });
    }
  },
  computed: {
    ...mapGetters(["loadedPost", "titleLoading", "postLoading"]),
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    },
    postImages() {
      
      /**
       * No deepCopy()
       * Any changes makes loadedPost.images state change
       * Use this.loadedPost in the case of deleting a post
       */
      
      if (this.loadedPost && this.loadedPost.images) {
        return this.loadedPost.images;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      configs: {
        placeholder: `Markdown syntax is supported. Click (?) for Help`,
        promptURLs: true,
        renderingConfig: {
          singleLineBreaks: true,
          codeSyntaxHighlighting: true
        },
        toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading-1",
          "heading-2",
          "heading-3",
          "|",
          "code",
          "quote",
          "unordered-list",
          "ordered-list",
          "table",
          "horizontal-rule",
          "clean-block",
          "|",
          {
            name: "link",
            action: () => {
              this.isModalLinkActive = true;
            },
            className: "fa fa-link",
            title: "Insert Link"
          },
          {
            name: "image",
            action: () => {
              if (!this.$v.postTitle.$invalid) {
                this.isModalImageActive = true;
              }
            },
            className: "fa fa-image",
            title: "Upload Image"
          },
          {
            name: "embed",
            action: () => {
              this.isModalEmbedActive = true;
            },
            className: "fa fa-file-code-o",
            title: "Add Embed"
          },
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
          "|",
          "undo",
          "redo",
          "|",
          {
            name: "guide",
            action: () => {
              window.open(
                "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",
                "_blank"
              );
            },
            className: "fa fa-question-circle",
            title: "Help"
          },
          {
            name: "emoji",
            action: () => {
              window.open("https://gist.github.com/rxaviers/7360908", "_blank");
            },
            className: "fa fa-smile-o",
            title: "Emoji"
          }
        ]
      },

      isModalLinkActive: false,
      isModalImageActive: false,
      isModalEmbedActive: false,
      isModalConfirmActive: false,

      categories: categories,

      buffer: null,
      postTitle: "",
      //postImages: [],
      postContent: {}
    };
  },
  validations: {
    postTitle: {
      required
    }
  },
  methods: {
    async onPublish() {
      this.postContent.html = this.simplemde.markdown(this.postContent.markdown);
      await this.$store.dispatch("addPostContent", this.postContent);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onPublish() Error",
          type: "is-danger"
        });
      } else {
        const postUrl = this.loadedPost.url;
        this.$router.push(`/posts/${postUrl}`);
      }
    },
    async onDelete() {
      await this.$store.dispatch("deletePost");
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onDelete() Error",
          type: "is-danger"
        });
      } else {
        this.isModalConfirmActive = false;
        this.$router.push("/");
      }
    },
    async onChangeTitle() {
      this.$v.postTitle.$touch();
      if (!this.$v.postTitle.$invalid) {
        await this.$store.dispatch("updatePostTitle", this.postTitle);
      }
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onChangeTitle() Error",
          type: "is-danger"
        });
      }
    },
    async onSelectImage(image) {
      const cm = this.simplemde.codemirror;
      cm.replaceSelection(`![](${image.url})`);
      this.isModalImageActive = false;
      setTimeout(function() {
        cm.focus();
      }, 0);
    },
    onInsertLink(link) {
      const cm = this.simplemde.codemirror;
      cm.replaceSelection(`[](${link})`);
      this.isModalLinkActive = false;
      setTimeout(function() {
        cm.focus();
      }, 0);
    },
    onInsertEmbed(link) { // TODO
      const cm = this.simplemde.codemirror;
      cm.replaceSelection(`{@embed: ${link} }`);
      this.isModalEmbedActive = false;
      setTimeout(function() {
        cm.focus();
      }, 0);
    }
  },
  head() {
    return {
      title: this.postTitle, // TODO
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Chỉnh sửa bài viết"
        }
      ]
    };
  }
};
</script>

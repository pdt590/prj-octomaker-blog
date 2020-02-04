<template>
  <div class="container">
    <form>
      <!-- Post info -->
      <b-field class="content" :type="$v.postTitle.$error ? `is-danger` : ``">
        <b-input
          placeholder="Title"
          type="text"
          v-model.trim="postTitle"
          @blur="onChangeTitle"
          icon="post-outline"
          :loading="titleLoading"
        ></b-input>
      </b-field>

      <b-field class="content">
        <b-select
          placeholder="Danh mục"
          v-model="postContent.category"
          expanded
          :disabled="$v.postTitle.$invalid"
          icon="check-circle"
        >
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
            >{{ category.name }}</option
          >
        </b-select>
      </b-field>

      <b-field class="content">
        <b-taginput
          placeholder="Add a tag"
          v-model="postContent.tags"
          maxtags="3"
          :has-counter="false"
          icon="label"
        >
        </b-taginput>
      </b-field>

      <!-- simpleMDE -->
      <b-field>
        <client-only placeholder="Loading ...">
          <vue-simplemde
            ref="markdownEditor"
            :configs="configs"
            v-model="postContent.markdown"
            preview-class="markdown-body"
          />
        </client-only>
      </b-field>
      <!--  -->

      <div class="block">
        <b-radio
          v-model="postContent.mode"
          native-value="public"
          :disabled="$v.postTitle.$invalid"
          >Public</b-radio
        >
        <b-radio
          v-model="postContent.mode"
          native-value="private"
          :disabled="$v.postTitle.$invalid"
          >Private</b-radio
        >
      </div>

      <button
        class="button is-info"
        :class="{ 'is-loading': postLoading }"
        :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
        type="submit"
        @click.prevent="onPublish"
      >
        Update
      </button>
      <button
        class="button is-info"
        :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
        type="submit"
        @click.prevent="isModalConfirmActive = true"
      >
        Delete
      </button>
      <button
        class="button is-info"
        :disabled="$v.postTitle.$invalid"
        type="submit"
        @click.prevent="$router.push(`/posts/${postUrl}`)"
      >
        Back
      </button>
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
  created() {
    this.postTitle = this.loadedPost.title;

    this.postContent = {
      category: this.loadedPost.category,
      tags: this.loadedPost.tags,
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
    postUrl() {
      return this.loadedPost.url;
    },
    postImages() {
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
        autofocus: true,
        placeholder: `Markdown syntax is supported. Click (?) for Help`,
        spellChecker: false,
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
          /* {
            name: "embed",
            action: () => {
              this.isModalEmbedActive = true;
            },
            className: "fa fa-file-code-o",
            title: "Add Embed"
          }, */
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
          },
          {
            name: "test",
            action: () => {
              const smde = this.simplemde;
              const cm = this.simplemde.codemirror;
              console.log("simplemde", smde);
              console.log("codemirror", cm);
            },
            className: "fa fa-commenting-o",
            title: "Click for Test"
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
    },
    postContent: {
      category: {
        required
      },
      tags: {
        required
      }
    }
  },
  methods: {
    async onPublish() {
      this.postContent.html = this.simplemde.markdown(
        this.postContent.markdown
      );
      await this.$store.dispatch("addPostContent", this.postContent);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onPublish() Error",
          type: "is-danger"
        });
      } else {
        this.$router.push(`/posts/${this.postUrl}`);
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
      window.prompt = () => {
        return link;
      };
      this.simplemde.drawLink();
      this.isModalLinkActive = false;
    },
    onInsertEmbed(link) {
      // TODO
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
      title: "Edit Post",
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

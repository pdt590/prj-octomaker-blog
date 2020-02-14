<template>
  <div class="container">
    <form>
      <b-field :type="$v.postTitle.$error ? `is-danger` : ``">
        <b-input
          placeholder="Title"
          type="text"
          v-model.trim="postTitle"
          @blur="onChangeTitle"
          icon="newspaper"
          :loading="postLoading && loadEvent === `onChangeTitle`"
        ></b-input>
      </b-field>

      <b-field>
        <b-select
          placeholder="Danh mục"
          v-model="postContent.category"
          expanded
          :disabled="$v.postTitle.$invalid"
          icon="list"
        >
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
            >{{ category.name }}</option
          >
        </b-select>
      </b-field>

      <b-field>
        <b-taginput
          placeholder="Add a tag"
          v-model="postContent.tags"
          maxtags="3"
          :has-counter="false"
          icon="tag"
        ></b-taginput>
      </b-field>

      <!-- Start simpleMDE -->
      <b-field>
        <client-only placeholder="Loading ...">
          <vue-simplemde
            v-highlight
            ref="markdownEditor"
            :configs="configs"
            v-model="postContent.markdown"
            preview-class="content markdown-body"
          />
        </client-only>
      </b-field>
      <!-- End simpleMDE -->

      <div class="block">
        <b-radio
          type="is-info"
          v-model="postContent.mode"
          native-value="public"
          :disabled="$v.postTitle.$invalid"
          >Public</b-radio
        >
        <b-radio
          type="is-info"
          v-model="postContent.mode"
          native-value="private"
          :disabled="$v.postTitle.$invalid"
          >Private</b-radio
        >
      </div>

      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <button
            class="level-item button is-info is-outlined"
            :class="{ 'is-loading': postLoading && loadEvent === `onPublish` }"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            type="submit"
            @click.prevent="onPublish"
          >
            Update
          </button>
          <button
            class="level-item button is-info is-outlined"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            type="submit"
            @click.prevent="isModalConfirmActive = true"
          >
            Delete
          </button>
        </div>
      </div>
    </form>

    <!-- Modal -->
    <b-modal :active.sync="isModalImageActive" has-modal-card>
      <v-modal-image :value="postImages" @select="onSelectImage" />
    </b-modal>
    <b-modal :active.sync="isModalConfirmActive" has-modal-card>
      <v-modal-confirm @delete="onDelete" />
    </b-modal>
    <b-modal :active.sync="isModalLinkActive" has-modal-card>
      <v-modal-link @insert="onInsertLink" />
    </b-modal>
    <b-modal :active.sync="isModalEmbedActive" has-modal-card>
      <v-modal-embed @insert="onInsertEmbed" />
    </b-modal>
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy } from "~/libs/helpers";
import { categories } from "~/libs/lists";
import { required } from "vuelidate/lib/validators";
import Prism from "prismjs";

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
    ...mapGetters(["loadedPost", "postLoading"]),
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
        placeholder: `Content format: \n # Introduction \n - Describe overall your post \n - Don't use picture/bullet/link \n # Content \n - Write your post`,
        spellChecker: false,
        tabSize: 4,
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
          //"preview",
          //"side-by-side",
          {
            name: "preview",
            action: () => {
              this.simplemde.togglePreview();
              Prism.highlightAll();
            },
            className: "fa fa-eye no-disable",
            title: "Toggle Preview (Ctrl-P)"
          },
          {
            name: "side-by-side",
            action: () => {
              this.simplemde.toggleSideBySide();
              Prism.highlightAll();
            },
            className: "fa fa-columns no-disable no-mobile",
            title: "Toggle Side-by-Side (F9)"
          },
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

      postTitle: "",
      //postImages: [],
      postContent: {},

      loadEvent: ""
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
    async onChangeTitle() {
      this.loadEvent = "onChangeTitle";
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
      this.loadEvent = "";
    },
    async onPublish() {
      this.loadEvent = "onPublish";
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
      this.loadEvent = "";
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

    /* Start simplemde events */
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
    /* End simplemde events */
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

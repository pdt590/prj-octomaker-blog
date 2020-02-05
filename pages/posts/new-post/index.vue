<template>
  <div class="container">
    <form>
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
          :disabled="$v.postTitle.$invalid || !isTitleAdded"
          icon="check-circle"
        >
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
          >{{ category.name }}</option>
        </b-select>
      </b-field>

      <b-field class="content">
        <b-taginput
          placeholder="Add a tag"
          v-model="postContent.tags"
          maxtags="3"
          :has-counter="false"
          icon="label"
        ></b-taginput>
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
          :disabled="$v.postTitle.$invalid || !isTitleAdded"
        >Public</b-radio>
        <b-radio
          v-model="postContent.mode"
          native-value="private"
          :disabled="$v.postTitle.$invalid || !isTitleAdded"
        >Private</b-radio>
      </div>

      <button
        class="button is-info"
        :class="{ 'is-loading': postLoading }"
        :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
        type="submit"
        @click.prevent="onPublish"
      >Publish</button>
      <button
        class="button is-info"
        :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
        type="submit"
        @click.prevent="isModalConfirmActive = true"
      >Discard</button>
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
import { isImage } from "~/libs/helpers";
import { categories } from "~/libs/lists";
import { required } from "vuelidate/lib/validators";

export default {
  middleware: ["server-client-auth"],
  computed: {
    ...mapGetters(["loadedPost", "titleLoading", "postLoading"]),
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
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
        placeholder: `Content format: \n # Introduction \n - Describe overall your post \n - Dont use picture in this section \n - Dont use bullet in this section \n # Content \n - Write your post`,
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
              if (!this.$v.postTitle.$invalid && this.isTitleAdded) {
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
      postContent: {
        category: "iot",
        tags: [],
        mode: "private",
        markdown: "",
        html: ""
      },

      isTitleAdded: false
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
          message: "onDiscard() Error",
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
        if (this.isTitleAdded) {
          await this.$store.dispatch("updatePostTitle", this.postTitle);
        } else {
          await this.$store.dispatch("addPostTitle", this.postTitle);
          this.postLoading ? "" : (this.isTitleAdded = true);
        }
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
      title: "New Post",
      meta: [
        { hid: "description", name: "description", content: "Tạo bài viết" }
      ]
    };
  }
};
</script>

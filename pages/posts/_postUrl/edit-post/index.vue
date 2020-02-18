<template>
  <div class="_fullscreen">
    <div class="container">
      <b-field grouped>
        <b-field :type="$v.postTitle.$error ? `is-danger` : ``" expanded>
          <b-input
            :placeholder="$t('edit_post.title_placeholder')"
            type="text"
            v-model.trim="postTitle"
            @blur="onChangeTitle"
            icon="newspaper"
            :loading="postLoading && loadEvent === `onChangeTitle`"
          ></b-input>
        </b-field>
        <b-field expanded>
          <b-select
            :placeholder="$t('edit_post.category_placeholder')"
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
      </b-field>

      <b-field>
        <b-taginput
          :placeholder="$t('edit_post.tag_placeholder')"
          v-model="postContent.tags"
          maxtags="3"
          :has-counter="false"
          icon="tag"
        ></b-taginput>
      </b-field>

      <!-- Start simpleMDE -->
      <b-field>
        <client-only placeholder="Loading ...">
          <v-editor
            ref="editor"
            v-model="postContent.markdown"
            :images="postImages"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            location="edit-post"
            @blur="onBlur"
          />
        </client-only>
      </b-field>
      <!-- End simpleMDE -->

      <div class="level">
        <div class="level-left">
          <div class="block">
            <b-radio
              type="is-info"
              v-model="postContent.mode"
              native-value="public"
              :disabled="$v.postTitle.$invalid"
              >{{ $t("edit_post.public_radio") }}</b-radio
            >
            <b-radio
              type="is-info"
              v-model="postContent.mode"
              native-value="private"
              :disabled="$v.postTitle.$invalid"
              >{{ $t("edit_post.private_radio") }}</b-radio
            >
          </div>
        </div>
        <div class="level-right">
          <button
            type="submit"
            class="level-item button is-info is-outlined"
            :class="{ 'is-loading': postLoading && loadEvent === `onPublish` }"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            @click="onPublish"
          >
            {{ $t("edit_post.update_btn") }}
          </button>
          <button
            class="level-item button is-info is-outlined"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            @click="onDelete"
          >
            {{ $t("edit_post.delete_btn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";
import { required } from "vuelidate/lib/validators";

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
      return this.$refs.editor.simplemde;
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
      categories: categories,
      postTitle: "",
      postContent: {},
      loadEvent: "",
      isModalConfirmActive: false
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
    async onBlur() {
      this.postContent.html = this.simplemde.markdown(
        this.postContent.markdown
      );
      await this.$store.dispatch("addPostContent", this.postContent);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
      }
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
        this.$router.push(this.localePath(`/posts/${this.postUrl}`));
      }
      this.loadEvent = "";
    },
    onDelete() {
      this.$buefy.dialog.confirm({
        title: this.$t("edit_post.dialog.title"),
        message: this.$t("edit_post.dialog.message"),
        confirmText: this.$t("edit_post.dialog.confirm_text"),
        cancelText: this.$t("edit_post.dialog.cancel_text"),
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.$store.dispatch("deletePost");
          if (this.postLoading) {
            this.$store.commit("setPostLoading", false);
            this.$buefy.toast.open({
              duration: 3000,
              message: "onDelete() Error",
              type: "is-danger"
            });
          } else {
            this.$router.push(this.localePath("/"));
          }
        }
      });
    }
  },
  head() {
    return {
      title: this.$t("edit_post.head.title")
    };
  }
};
</script>

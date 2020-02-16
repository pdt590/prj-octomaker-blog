<template>
  <div class="_fullscreen">
    <div class="container">
      <b-field grouped>
        <b-field :type="$v.postTitle.$error ? `is-danger` : ``" expanded>
          <b-input
            placeholder="Title"
            type="text"
            v-model.trim="postTitle"
            @blur="onChangeTitle"
            icon="newspaper"
            :loading="postLoading && loadEvent === `onChangeTitle`"
          ></b-input>
        </b-field>
        <b-field expanded>
          <b-select
            placeholder="Danh mục"
            v-model="postContent.category"
            expanded
            :disabled="$v.postTitle.$invalid || !isTitleAdded"
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
          <v-editor
            ref="editor"
            :value="postContent.markdown"
            :images="postImages"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
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
              :disabled="$v.postTitle.$invalid || !isTitleAdded"
              >Public</b-radio
            >
            <b-radio
              type="is-info"
              v-model="postContent.mode"
              native-value="private"
              :disabled="$v.postTitle.$invalid || !isTitleAdded"
              >Private</b-radio
            >
          </div>
        </div>
        <div class="level-right">
          <button
            class="level-item button is-info is-outlined"
            :class="{ 'is-loading': postLoading && loadEvent === `onPublish` }"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            @click="onPublish"
          >
            Publish
          </button>
          <button
            class="level-item button is-info is-outlined"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            @click="onDelete"
          >
            Discard
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
  middleware: ["server-client-auth"],
  computed: {
    ...mapGetters(["loadedPost", "postLoading"]),
    simplemde() {
      return this.$refs.editor.simplemde;
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
      postContent: {
        category: "iot",
        tags: ["iot"],
        mode: "private",
        markdown: "",
        html: ""
      },
      isTitleAdded: false,
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
        const postUrl = this.loadedPost.url;
        this.$router.push(`/posts/${postUrl}`);
      }
      this.loadEvent = "";
    },
    onDelete() {
      this.$buefy.dialog.confirm({
        title: "Deleting Post",
        message:
          "Are you sure you want to <b>delete</b> your post? This action cannot be undone.",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.$store.dispatch("deletePost");
          if (this.postLoading) {
            this.$store.commit("setPostLoading", false);
            this.$buefy.toast.open({
              duration: 3000,
              message: "onDiscard() Error",
              type: "is-danger"
            });
          } else {
            this.$router.push("/");
          }
        }
      });
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

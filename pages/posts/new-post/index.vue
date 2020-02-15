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
          <v-editor ref="editor" :value="postContent.markdown" :images="postImages" />
        </client-only>
      </b-field>
      <!-- End simpleMDE -->

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
            Publish
          </button>
          <button
            class="level-item button is-info is-outlined"
            :disabled="$v.postTitle.$invalid || $v.postContent.$invalid"
            type="submit"
            @click.prevent="isModalConfirmActive = true"
          >
            Discard
          </button>
        </div>
      </div>
    </form>
    <!-- Start modal -->
    <b-modal :active.sync="isModalConfirmActive" has-modal-card>
      <v-modal-confirm @delete="onDelete" />
    </b-modal>
    <!-- End modal -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/libs/lists";
import { required } from "vuelidate/lib/validators";
import Prism from "prismjs";

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
        tags: [],
        mode: "private",
        markdown: "",
        html: ""
      },
      isTitleAdded: false,
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

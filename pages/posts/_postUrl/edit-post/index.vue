<template>
  <div class="container">
    <form>
      <!-- Post info -->
      <b-field
        label="Title"
        expanded
        :type="$v.postTitle.$invalid ? `is-danger` : ``"
      >
        <b-input
          type="text"
          v-model.trim="postTitle"
          @blur="onChangeTitle"
          icon="post-outline"
        ></b-input>
      </b-field>

      <b-field label="Danh mục">
        <b-select v-model="postContent.category" expanded>
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
            >{{ category.name }}</option
          >
        </b-select>
      </b-field>

      <b-field label="Nội dung">
        <client-only placeholder="Loading ...">
          <mavon-editor
            ref="md"
            :toolbars="markdownOption"
            :boxShadow="false"
            :placeholder="placeholder"
            :editable="!$v.postTitle.$invalid"
            language="en"
            v-model="postContent.content"
            @change="onSetContent"
            @imgAdd="onAddImage"
            @imgDel="onDeleteImage"
          />
        </client-only>
      </b-field>

      <div class="block">
        <b-radio v-model="postContent.mode" native-value="public"
          >Public</b-radio
        >
        <b-radio v-model="postContent.mode" native-value="private"
          >Private</b-radio
        >
      </div>

      <button
        class="button is-info is-rounded"
        :class="{ 'is-loading': postLoading }"
        :disabled="$v.postTitle.$invalid"
        type="submit"
        @click.prevent="onPublish"
      >
        Đăng bài
      </button>
      <button
        class="button is-info is-rounded"
        :class="{ 'is-loading': postLoading }"
        :disabled="$v.postTitle.$invalid"
        type="submit"
        @click.prevent="onDelete"
      >
        Xóa bài
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isImage, deepCopy } from "~/plugins/util-helpers";
import { categories } from "~/plugins/util-lists";
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
  computed: {
    ...mapGetters(["loadedPost", "postLoading"])
  },
  created() {
    this.postData = deepCopy(this.loadedPost);
    this.postTitle = this.postData.title;
    delete this.postData.title;
    if (this.postData.images) {
      this.postOldImages = deepCopy(this.postData.images);
      delete this.postData.images;
    }
    delete this.postData._creator;
    delete this.postData.url;
    this.postContent = deepCopy(this.postData);
  },
  async fetch({ app, store, params, error }) {
    await store.dispatch("loadPost", params.postUrl);
    if (store.getters.postLoading) {
      store.commit("setPostLoading", false);
      error({ statusCode: 500, message: "loadPost() Error" });
    }
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
      placeholder: `Markdown syntax is supported. Click (?) for Help`,

      categories: categories,

      postData: null,
      postTitle: null,

      postImages: [],
      postPreviewImages: [],
      postOldImages: [],

      postContent: ""
    };
  },
  validations: {
    postTitle: {
      required
    },
    postImages: {
      isImg: isImage
    },
    postContent: {
      category: {
        required
      },
      mode: {
        required
      },
      content: {
        required
      },
      html: {
        required
      }
    }
  },
  methods: {
    async onPublish() {
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
      }
      this.$router.push("/");
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
    onSetContent(value, render) {
      this.postContent.html = render;
    },
    async onAddImage(pos, file) {
      const uploadedImage = await this.$store.dispatch("addPostImage", file);
      this.postImages.push(uploadedImage);
      this.$refs.md.$img2Url(pos, uploadedImage.url);
    },
    async onDeleteImage(image) {
      const selectedImage = this.postImages.find(item => item.url === image[0]);
      await this.$store.dispatch("deletePostImage", selectedImage);
      this.$refs.md.$imgUpdateByUrl(selectedImage.url, "");
    }
  },
  head() {
    return {
      title: this.postTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.postContent.content //TODO
        }
      ]
    };
  }
};
</script>

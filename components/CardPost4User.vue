<template>
  <div class="media _media">
    <div class="media-left">
      <nuxt-link :to="`/posts/${postUrl}`">
        <figure class="image is-128x128">
          <client-only>
            <img
              class="_thumbnail-image-horizontal"
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="post_thumbnail"
            />
          </client-only>
        </figure>
      </nuxt-link>
    </div>
    <div class="media-content" style="overflow: hidden;">
      <div class="content">
        <strong>
          <nuxt-link :to="`/posts/${postUrl}`" class="is-size-5">
            {{ postTitle }}
          </nuxt-link>
        </strong>
      </div>
      <div class="level">
        <div class="level-left">
          <b-icon pack="far" icon="clock" size="is-small"></b-icon>
          &nbsp;
          <p>{{ postUpdatedDate | fmDate }}</p>
        </div>
      </div>
    </div>
    <div class="media-right">
      <div class="buttons">
        <a class="button is-danger is-outlined" @click="onDelete">Delete</a>
        <nuxt-link
          class="button is-info is-outlined"
          :to="`/posts/${postUrl}/edit-post`"
          target="_blank"
          >Edit</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchDesc } from "~/libs/helpers";
import { categories } from "~/libs/lists";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["postLoading"]),
    postUrl() {
      return this.value.url;
    },
    postTitle() {
      return this.value.title;
    },
    postCategory() {
      const category = categories.find(item => item.id === this.value.category);
      return category.name;
    },
    postTags() {
      return this.value.tags;
    },
    postUpdatedDate() {
      return this.value.updatedDate;
    },
    postDescription() {
      return fetchDesc(this.value.html);
    },
    postThumbnail() {
      if (this.value.images) {
        return this.value.images[0].url;
      } else {
        return "/icon-photo.png";
      }
    },
    creatorAvatar() {
      if (this.value.creator.avatar) {
        return this.value.creator.avatar.url;
      } else {
        return "/icon-user.png";
      }
    },
    creatorUsername() {
      return this.value.creator.username;
    }
  },
  methods: {
    onDelete() {
      this.$buefy.dialog.confirm({
        title: "Deleting Post",
        message:
          "Are you sure you want to <b>delete</b> your post? This action cannot be undone.",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          await this.$store.dispatch("deletePostByUser", this.postUrl);
          if (this.postLoading) {
            this.$store.commit("setPostLoading", false);
            this.$buefy.toast.open({
              duration: 3000,
              message: "onDelete() Error",
              type: "is-danger"
            });
          } else {
            location.reload();
          }
        }
      });
    }
  }
};
</script>

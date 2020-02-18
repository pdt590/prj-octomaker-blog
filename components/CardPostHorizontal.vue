<template>
  <div class="media _media">
    <div class="media-left">
      <nuxt-link :to="localePath(`/posts/${postUrl}`)">
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
          <nuxt-link
            class="is-size-5"
            :to="localePath(`/posts/${postUrl}`)"
            target="_blank"
          >
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
        <nuxt-link
          class="button is-info is-outlined"
          :to="localePath(`/posts/${postUrl}/edit-post`)"
          target="_blank"
          >{{ $t("card_post_horizontal.edit_btn") }}</nuxt-link
        >
        <a class="button is-danger is-outlined" @click="onDelete">{{
          $t("card_post_horizontal.delete_btn")
        }}</a>
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
        title: this.$t("card_post_horizontal.dialog.title"),
        message: this.$t("card_post_horizontal.dialog.message"),
        confirmText: this.$t("card_post_horizontal.dialog.confirm_text"),
        cancelText: this.$t("card_post_horizontal.dialog.cancel_text"),
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
            //location.reload();
            this.$emit('delete', this.postUrl)
          }
        }
      });
    }
  }
};
</script>

<template>
  <div class="card _card">
    <div class="card-image _card-image">
      <nuxt-link :to="localePath(`/posts/${postUrl}`)">
        <figure class="image is-4by3">
          <client-only>
            <img
              class="_thumbnail-image"
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="post_thumbnail"
            />
          </client-only>
        </figure>
      </nuxt-link>
      <figure class="_card-avatar">
        <client-only>
          <img
            class="_creator-avatar"
            v-lazy="creatorAvatar"
            style="display: none"
            onload="this.style.display = 'block'"
            alt="creator_avatar"
          />
        </client-only>
      </figure>
    </div>
    <div class="card-content _card-content">
      <div class="content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ postTitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchDesc } from "~/libs/helpers";
import { categories } from "~/libs/lists";

export default {
  name: "card-post-recommend",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    postUrl() {
      return this.value.url;
    },
    postTitle() {
      return this.value.title;
    },
    postMode() {
      return this.value.mode
    },
    postCategory() {
      const category = categories.find(item => item.id === this.value.category);
      return category.name;
    },
    postTags() {
      return this.value.tags;
    },
    postDescription() {
      return fetchDesc(this.value.html);
    },
    postUpdatedDate() {
      return this.value.updatedDate;
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
  }
};
</script>

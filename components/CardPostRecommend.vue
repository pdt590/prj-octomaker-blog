<template>
  <div class="media _media-recommend">
    <div class="media-left">
      <nuxt-link :to="localePath(`/posts/${postUrl}`)">
        <figure class="image is-96x96">
          <client-only>
            <img
              class="_thumbnail-image-recommend"
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
          <nuxt-link class="is-size-6" :to="localePath(`/posts/${postUrl}`)">
            {{ postTitle }}
          </nuxt-link>
        </strong>
      </div>
      <div class="tags">
        <span class="tag is-info is-small">{{ postCategory }}</span>
        <span
          v-for="(tag, index) in postTags"
          :key="index"
          class="tag is-warning is-small"
          >{{ tag }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from "~/libs/lists";

export default {
  name: "v-card-post-horizontal",
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
    postCategory() {
      const category = categories.find(item => item.id === this.value.category);
      return category.name;
    },
    postTags() {
      return this.value.tags;
    },
    postThumbnail() {
      if (this.value.images) {
        return this.value.images[0].url;
      } else {
        return "/icon-photo.png";
      }
    }
  }
};
</script>

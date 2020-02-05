<template>
  <div class="media v-media">
    <div class="media-left">
      <nuxt-link :to="`/posts/${postUrl}`">
        <figure class="image is-96x96">
          <client-only>
            <img
              class="v-image-mobile-card"
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="shop_image"
            />
          </client-only>
        </figure>
      </nuxt-link>
    </div>
    <div class="media-content" style="overflow: hidden;">
      <div class="content">
        <strong>
          <nuxt-link :to="`/posts/${postUrl}`">{{
            postTitle
          }}</nuxt-link> </strong
        >&bull;
        <small class="is-uppercase">{{ postCategory }}</small>
        <br />
        <br />
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item"></div>
        </div>
        <div class="level-right">
          <div class="level-item"></div>
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
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    postUrl() {
      return this.value.url
    },
    postTitle() {
      return this.value.title
    },
    postCategory() {
      const category = categories.find(
        item => item.id === this.value.category
      );
      return category.name;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.v-media {
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 0.5rem;
}
</style>

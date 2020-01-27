<template>
  <div class="media v-media">
    <div class="media-left">
      <nuxt-link :to="`/posts/${postData.url}`">
        <figure class="image is-96x96">
          <client-only>
            <img
              class="v-image-mobile-card"
              v-lazy="postData.images ? postData.images[0].url : `/icon-photo.png`"
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
          <nuxt-link :to="`/posts/${postData.url}`">{{postData.title}}</nuxt-link>
        </strong>&bull;
        <small class="is-uppercase">{{postCategory}}</small>
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
import { categories } from "~/plugins/util-lists";

export default {
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    postCategory() {
      return categories.find(category => category.id === this.postData.category).name;
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

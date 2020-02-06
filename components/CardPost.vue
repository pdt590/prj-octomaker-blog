<template>
  <div class="card _card">
    <div class="card-image _card__image">
      <nuxt-link :to="`/posts/${postUrl}`">
        <figure class="image is-4by3">
          <client-only>
            <img
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="post_image"
            />
          </client-only>
        </figure>
        <div class="content _card__image__post-desc">
          <p
            class="is-size-6 has-text-black has-text-weight-normal"
            style="line-height: 1.5em;"
          >
            {{ postDescription | fmString(60) }}
          </p>
        </div>
      </nuxt-link>
    </div>
    <div class="card-content">
      <p class="is-size-6 is-uppercase has-text-grey-light">
        {{ postCategory }}
      </p>
      <nuxt-link :to="`/posts/${postUrl}`">
        <span class="is-size-6 has-text-black has-text-weight-bold">{{
          postTitle
        }}</span>
      </nuxt-link>
    </div>
    <div class="card-footer _card__footer"></div>
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
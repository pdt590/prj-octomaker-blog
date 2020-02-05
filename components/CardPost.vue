<template>
  <div class="card">
    <div class="card-image v-card-image">
      <nuxt-link :to="`/posts/${postUrl}`">
        <figure class="image is-4by3">
          <client-only>
            <img
              class="v-image-card"
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="post_image"
            />
          </client-only>
        </figure>
        <div class="content v-post-description">
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
    <div class="card-footer v-card-footer"></div>
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
.card {
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  box-shadow: none;
  .v-card-image {
    position: relative;
    transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-bottom: 1px solid #d8d8d8;
    img {
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
    }
    .v-post-description {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      padding: 1.5rem;
      background-color: #eee;
      opacity: 0;
    }
  }
  .v-card-image:hover .v-post-description {
    opacity: 0.9;
  }
  .v-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.6rem 1.5rem;
  }
}
</style>

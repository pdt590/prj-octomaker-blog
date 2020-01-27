<template>
  <div class="media v-media">
    <div class="media-left">
      <nuxt-link :to="`/posts/${postData.url}`">
        <figure class="image is-96x96">
          <client-only>
            <img
              class="v-image-mobile-card"
              v-lazy="postThumbnail"
              style="display: none"
              onload="this.style.display = 'block'"
              alt="item_image"
            />
          </client-only>
        </figure>
      </nuxt-link>
    </div>
    <div class="media-content" style="overflow: hidden;">
      <div class="content">
        <strong>
          <nuxt-link :to="`/posts/${postData.url}`">{{postData.title}}</nuxt-link>
        </strong>
        <small class="is-uppercase">- {{postCategory}}</small>
        <!-- For mobile -->
        <div class="has-text-grey-light is-hidden-tablet">
          <b-icon icon="clock-outline" size="is-small"></b-icon>
          {{postData.updatedDate | fmDate}}
        </div>
        <!--  -->
      </div>
      <!-- For mobile -->
      <div class="buttons is-hidden-tablet">
        <a class="button is-danger is-rounded is-outlined" @click="isModalConfirmActive=true">Xóa</a>
        <nuxt-link
          class="button is-info is-rounded is-outlined"
          :to="`/posts/${postData.url}/edit-post`"
          target="_blank"
        >Sửa</nuxt-link>
      </div>
      <!--  -->
      <div class="level is-mobile is-hidden-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="has-text-grey-light">
              <b-icon icon="clock-outline" size="is-small"></b-icon>
              {{postData.updatedDate | fmDate}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="media-right is-hidden-mobile">
      <div class="buttons">
        <a class="button is-danger is-rounded is-outlined" @click="isModalConfirmActive=true">Xóa</a>
        <nuxt-link
          class="button is-info is-rounded is-outlined"
          :to="`/posts/${postData.url}/edit-post`"
          target="_blank"
        >Sửa</nuxt-link>
      </div>
    </div>
    <b-modal :active.sync="isModalConfirmActive" has-modal-card>
      <v-modal-delete-confirm :postData="postData" />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { categories } from "~/plugins/util-lists"

export default {
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    postCategory() {
      const category = categories.find(item => item.id === this.postData.category)
      return category.name
    },
    postThumbnail() {
      if(this.postData.images) {
        return this.postData.images[0].url
      } else {
        return "/icon-photo.png" 
      }
    }
  },
  data() {
    return {
      isModalConfirmActive: false
    };
  }
};
</script>

<style lang="scss" scoped>
.v-media {
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 0.5rem;
}
</style>

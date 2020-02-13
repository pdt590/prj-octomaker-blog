<template>
  <div class="media _media">
    <div class="media-left">
      <nuxt-link :to="`/posts/${postUrl}`">
        <figure class="image is-96x96">
          <client-only>
            <img
              class="_image-horizontal-card"
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
          <nuxt-link :to="`/posts/${postUrl}`">
            {{
            postTitle
            }}
          </nuxt-link>
        </strong>
        <small class="is-uppercase">- {{ postCategory }}</small>
      </div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="has-text-grey-light">
              <b-icon icon="clock" size="is-small"></b-icon>
              {{ postUpdatedDate | fmDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="media-right">
      <div class="buttons">
        <a class="button is-danger is-outlined" @click="isModalConfirmActive = true">Xóa</a>
        <nuxt-link
          class="button is-info is-outlined"
          :to="`/posts/${postUrl}/edit-post`"
          target="_blank"
        >Sửa</nuxt-link>
      </div>
    </div>
    <b-modal :active.sync="isModalConfirmActive" has-modal-card>
      <v-modal-confirm @delete="onDelete" />
    </b-modal>
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
    }
  },
  data() {
    return {
      isModalConfirmActive: false
    };
  },
  methods: {
    async onDelete() {
      await this.$store.dispatch("deletePostByUser", this.postUrl);
      if (this.postLoading) {
        this.$store.commit("setPostLoading", false);
        this.$buefy.toast.open({
          duration: 3000,
          message: "onDelete() Error",
          type: "is-danger"
        });
      } else {
        this.isModalConfirmActive = false;
        location.reload();
      }
    }
  }
};
</script>
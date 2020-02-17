<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container has-text-centered _card-input">
        <p class="title is-3" v-if="error.statusCode === 404">
          {{ $t('error.page_not_found') }}
        </p>
        <p class="title is-3" v-else>{{ error.message }}</p>
        <nuxt-link class="subtitle is-4 has-text-link" :to="localePath('/')"
          >{{ $t('error.home_link') }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  head() {
    return {
      title: this.$t('error.head.title')
    }
  }
};
</script>

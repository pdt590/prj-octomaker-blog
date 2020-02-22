<template>
  <div class="_center_view">
    <b-message
      type="is-danger"
      has-icon
      size="is-large"
      v-if="error.statusCode === 404"
    >
      {{ $t("error.page_not_found") }}
      <br />
      <nuxt-link :to="localePath('/')">{{ $t("error.home_link") }}</nuxt-link>
    </b-message>
    <b-message type="is-danger" has-icon size="is-large" v-else>
      {{ error.message }}
      <br />
      <nuxt-link :to="localePath('/')">{{ $t("error.home_link") }}</nuxt-link>
    </b-message>
  </div>
</template>

<script>
export default {
  layout: "empty",
  props: ["error"],
  head() {
    return {
      title: this.$t("error.head.title")
    };
  }
};
</script>

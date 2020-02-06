<template>
  <div class="_default">
    <v-navbar class="is-hidden-mobile" />
    <v-navbar-mobile class="is-hidden-tablet" />
    <main class="_default__main">
      <nuxt />
    </main>
    <v-footer />
  </div>
</template>

<script>
export default {
  middleware: "client-init-auth"
};
</script>

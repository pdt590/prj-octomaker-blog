<template>
  <div class="v-layout">
    <v-navbar class="is-hidden-mobile" />
    <v-navbar-mobile class="is-hidden-tablet" />
    <main class="v-main">
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

<style lang="scss" scoped>
.v-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.v-main {
  flex: 1;
}
</style>

<template>
  <div class="_default">
    <v-navbar />
    <main class="_default__main">
      <nuxt class="_default__main__nuxt"/>
    </main>
    <v-footer />
  </div>
</template>

<script>
export default {
  middleware: "client-init-auth"
};
</script>

<template>
  <b-loading :active.sync="isLoading"></b-loading>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    start() {
      this.isLoading = true;
    },
    finish() {
      this.isLoading = false;
    }
  }
};
</script>

<template>
  <div></div>
</template>
<script>
export default {
  name: "driverApp",
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    window.open('https://mobile.umeng.com/');
    this.$router.go(-1)
  },
};
</script>

<style  scoped>
</style>
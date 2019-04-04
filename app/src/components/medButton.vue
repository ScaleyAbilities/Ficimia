<template>
  <div>
    <v-btn medium :color="color" :block="block" :to="to">{{msg}}</v-btn>
  </div>
</template>

<script>
export default {
  name: "medButton",
  props: {
    msg: String,
    color: String,
    block: { default: false, type: Boolean },
    to: { default: undefined, type: String }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

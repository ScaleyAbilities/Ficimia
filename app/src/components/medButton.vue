<template>
  <v-flex :class="size" mx-1 id="medButton">
    <v-btn class="button"
      :dark="true"
      :large="true"
      :outline="true"
      :color="color"
      :disabled="disabled"
      :block="block"
      :to="to"
      v-on:click="$emit('clicked')"
    >{{msg}}</v-btn>
  </v-flex>
</template>

<script>
export default {
  name: "medButton",
  props: {
    msg: String,
    color: String,
    block: { default: false, type: Boolean },
    to: { default: undefined, type: String },
    disabled: { default: false, type: Boolean },
    size: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button {
    height: 58px;
    margin: 0;
  }
</style>

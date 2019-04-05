<template>
  <v-flex :class="size" mx-1>
    <v-text-field
      v-model="amount"
      label="Stock Amount"
      placeholder="69"
      type="number"
      min="1"
      color="white"
      :clearable="true"
      outline
      :dark="true"
      @input="$emit('change', amount)"
      @clear="$emit('change', amount)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "stockAmount",
  props: {
    size: String
  },
  data() {
    return {
      amount: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <v-flex :class="size" mx-1>
    <v-text-field 
      v-model="dollar"
      label="Amount" 
      placeholder="10.00"
      outline
      :dark="true"
      color="white"
      type="text"
      :clearable="true"
      v-on:change="$emit('change', dollar)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "dollarAmount",
  props: {
    size: String,
  },
  data() {
    return {
      dollar: '',
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
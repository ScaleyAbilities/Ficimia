<template>
  <v-flex grow pl-1 pr-1>
    <v-text-field 
        v-model="amount"
        label="Stock Amount" 
        placeholder="10"
        type="number"
        :clearable="true"
        outline
        :dark="true"
        v-on:change="$emit('change', amount)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "stockAmount",
  data() {
    return {
      amount: String,
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
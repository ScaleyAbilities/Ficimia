<template>
  <v-flex xs3 md2 mx-1>
    <v-text-field 
      v-model="stockSym"
      label="Stock Symbol" 
      outline
      :dark="true"
      color="white"
      mask="AAA"
      placeholder="ABC"
      :clearable="true"
      v-on:change="$emit('change', stockSym)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "stockSymbol",
  data() {
    return {
      stockSym: "",
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
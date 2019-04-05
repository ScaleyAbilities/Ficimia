<template>
  <v-flex grow pl-1 pr-1>
    <v-text-field 
        v-model="dollar"
        label="Amount" 
        placeholder="10.00"
        outline
        :dark="true"
        type="number"
        :clearable="true"
        v-on:change="$emit('change', dollar)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "dollarAmount",
  data() {
    return {
      dollar: String,
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
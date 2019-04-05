<template>
  <v-flex :class="size" mx-1>
    <v-text-field
      v-model="dollar"
      :label="custLabel ? custLabel : 'Dollar Amount'"
      :readonly="readonly"
      placeholder="420.00"
      min="0"
      outline
      :dark="true"
      type="number"
      :clearable="true"
      @input="$emit('change', dollar)"
      @clear="$emit('change', dollar)"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: "dollarAmount",
  props: {
    size: String,
    custLabel: String,
    readonly: {default: false, type: Boolean},
  },

  data() {
    return {
      dollar: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
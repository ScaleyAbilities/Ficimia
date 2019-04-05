<template>
  <v-flex :class="size" mx-1>
    <v-text-field 
        v-model="dollar"
        :label="custLabel ? custLabel : 'Dollar Amount'" 
        placeholder="10.00"
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
  },
  data() {
    return {
      dollar: '',
    }
  },

  props: {
    custLabel: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<template>
  <div data-app>
    <v-dialog v-model="dialog" dark persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{command}}</v-card-title>
        <v-card-text>
          <p>{{msg}}</p>
          <div v-if="stocks">
            <div v-for="(amount, stock) of stocks" :key="stock.id">
              <strong>{{stock}}</strong>: {{amount}}
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-show="cancel" color="red darken-1" flat="flat" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn
            v-show="confirm"
            color="green darken-1"
            flat="flat"
            @click="$emit('confirm')"
          >Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "confirmDialog",
  props: {
    cancel: { default: true, type: Boolean },
    confirm: { default: true, type: Boolean },
    command: String,
    stocks: Object,
    msg: String,
    dialog: { default: false, type: Boolean }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

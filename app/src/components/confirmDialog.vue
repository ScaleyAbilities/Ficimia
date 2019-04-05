<template>
  <div data-app>
    <v-dialog v-model="dialog" dark persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{command}}</v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="$emit('cancel')">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="$emit('confirm')">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "confirmDialog",
  props: {
    command: String,
    msg: String,
    dialog: { default: false, type: Boolean }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <v-container align-content-space-between justify-center id="login">
    <v-layout align-baseline row justify-center class="option">
      <v-flex grow pa-1>
        <v-text-field
          label="Username"
          box
          :dark="true"
          :clearable="true"
          v-model="username"
        ></v-text-field>
      </v-flex>
      <medButton msg="Login" color="#2ecc71" :disabled="(username == null)" :block="false" :to="'home/'+username"></medButton>
    </v-layout>
  </v-container>
</template>

<script>
import medButton from "./medButton.vue";
export default {
  name: "app",

  data: function() {
    return {
      username: null,
    };
  },

  components: {
    medButton
  }
};
</script>

<style>
#login {
  padding: 30%;
  padding-top: 20%;
  width: 100vw;
}
</style>
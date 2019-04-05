<template>
  <v-container align-content-start justify-center class="login">
    <v-layout row justify-center class="option">
      <v-flex grow md-1 mx-1>
        <v-text-field
          label="Username"
          :dark="true"
          color="white"
          :clearable="true"
          v-model="username"
        ></v-text-field>
      </v-flex>
      <v-flex shrink>
        <medButton msg="Login" color="#2ecc71" :disabled="(username == null)" :block="false" :to="'home/'+username"></medButton>
      </v-flex>
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
.login {
  max-width: 500px;
  padding-top: 30vh;
}
</style>

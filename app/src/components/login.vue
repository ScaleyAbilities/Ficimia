<template>
  <div id="login">
    <input v-model="username" placeholder="John Appleseed">
    <br>
    <medButton msg="Login" :block="true" :to="'home/'+username"></medButton>
  </div>
</template>

<script>
import medButton from "./medButton.vue";
export default {
  name: "app",

  data: function() {
    return {
      username: ""
    };
  },

  components: {
    medButton
  }
};
</script>

<style>
#login {
  display: flex;
  padding-top: 20%;
  justify-content: center;
  width: 100vw;
}
</style>
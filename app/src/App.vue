<template>
  <div id="app">
    <div class="heading">SCALEY ABILITIES</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  background-image: linear-gradient(to bottom, #2980b9, #ecf0f1);
  height: 100vh;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  /* put some fancy css here */
}

.heading {
  display: flex;
  justify-content: center;
  font-family: fantasy;
  font-size: 4em;
}
</style>

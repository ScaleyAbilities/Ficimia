<template>
  <div id="app">
    <marquee-text :repeat="30" :duration="3">
      <div class="heading">&nbsp;🐍 SCALEY ABILITIES</div>
    </marquee-text>
    <router-view/>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
export default {
  name: "app",
  components: {
    MarqueeText
  },
  data() {
    return {
      hide: false,
      username: '',
      command: ''
    }
  }
};
</script>

<style>
#app {
  height: 100vh;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  position: relative;
  background-color: black;
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("assets/snake.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.2;
}

.heading {
  display: flex;
  color: #ddd;
  justify-content: center;
  font-family: fantasy;
  font-size: 4em;
}
</style>
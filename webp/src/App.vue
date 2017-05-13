<template>
  <div id="app">
    <img src="./assets/logo.png">
    <abc></abc>
    <abcd></abcd>
    <router-view></router-view>
  </div>
</template>

<script>
  import abc from "./demo.vue";
  import abcd from "./demo1.vue";
export default {
  name: 'app',
  template:"<abc/>",
  components:{abc,abcd}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

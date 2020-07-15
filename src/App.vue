<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <win :type="'full'" :pid="'0'"></win>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import win from "./components/win"

export default {
  name: 'App',
  components: {
    // HelloWorld
    win
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

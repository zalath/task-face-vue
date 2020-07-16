<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <win :type="'full'" :pid="0" :etype="'list'"></win>
  </div>
</template>

<script>
import win from "./components/win"

export default {
  name: 'App',
  components: {
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
  color: #ccc;
  margin-top: 60px;
}
body{
  background-color:black;
}
</style>

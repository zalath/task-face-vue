<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div v-for="(w,i) in wins" :key="i">
      <win :type=w.type :pid=w.pid :etype=w.etype></win>
    </div>
  </div>
</template>

<script>
import win from "./components/win"

export default {
  name: 'App',
  components: {
    win
  },
  data:function(){
    return {
      wins:[]
    }
  },
  created:function(){
    this.wins.push({type:'full',pid:0,etype:'list'})
    this.$bus.on('openwin',this.openWin)
    this.$bus.on('closewin',this.closeWin)
  },
  methods:{
    openWin:function(el){
      var i = this.wins.map(item => item.pid).indexOf(el.pid)
      if(i == -1){
        this.wins.push({type:el.type,pid:el.pid,etype:el.etype})
        console.log('pushed')
      }else{
        this.$bus.emit('showwin',{pid:i})
      }
    },
    closeWin:function(pid){
      var i = this.wins.Child.map(item => item.pid).indexOf(pid)
      this.wins.splice(i,1);
    }
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

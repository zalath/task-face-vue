<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <win v-for="(w) in wins" :key="'win'+w.pid" :type=w.type :pid=w.pid :etype=w.etype :title=w.title :mousepoz=w.mousepoz></win>
    <edit></edit>
    <dele></dele>
    <move></move>
    <tik></tik>
  </div>
</template>

<script>
import win from "./components/win"
import edit from "./components/edit"
import dele from "./components/dele"
import move from "./components/move"
import tik from "./components/tik"

export default {
  name: 'App',
  components: {
    win,
    edit,
    dele,
    move,
    tik
  },
  data:function(){
    return {
      wins:[],
      handles:[]
    }
  },
  created:function(){
    this.wins.push({type:'full',pid:0,etype:'list',title:'',mousepoz:{x:0,y:0}})
    this.$bus.on('openwin',this.openWin)
    this.$bus.on('closewin',this.closeWin)
  },
  methods:{
    openWin:function(el){
      var i = this.wins.map(item => item.pid).indexOf(el.pid)
      if(i == -1){
        this.wins.push(el)
      }else{
        this.$bus.emit('showwin',el.pid)
      }
    },
    closeWin:function(pid){
      var i = this.wins.map(item => item.pid).indexOf(pid)
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
  overflow:hidden;
}
.btn{
    border-radius:0px !important;
    background-color:rgba(255,255,255,0) !important;
    border:none !important;
}
.btn:hover{
  background-color:rgba(255,255,255,0.4) !important;
}
</style>

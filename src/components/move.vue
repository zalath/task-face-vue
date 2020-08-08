<template>
    <div class="window win container" :style="style" v-hammer:pan="pan" v-hammer:panend="panend">
        <div class="winbar d-flex">
            <div class="title p-2 flex-grow-1">Moving</div>
            <div class="barbtns">
                <a class="btn btn-danger" v-on:click="cancel()">x</a>
            </div>
        </div>
        <div>
            <a class="btn btn-danger" v-on:click="cancel()">cancel</a>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
export default {
    name:"dele",
    data:function(){
        return{
            el:'',
            X:10,
            Y:10,
            zIndex:3,
            pozX:10,
            pozY:10,
            W:150+'px',
            border:"solid 1px red",
            display:'none',
            mousepoz:{x:0,y:0}
        }
    },
    computed:{
        style(){
            return {left:this.X+"px",display:this.display,top:this.Y+"px",zIndex:this.zIndex,width:this.W,border:this.border}
        }
    },
    created(){

        this.$bus.on('tomove',this.moving)
        this.$bus.on('move',this.moved)
    },
    methods:{
        moving:function(dat){
            this.mousepoz = dat.e.center
            this.setpoz()
            this.display = 'block';
            this.el =  dat.el
        },
        setpoz:function(){
            this.X = this.mousepoz.x
            this.Y = this.mousepoz.y
            this.pozX = this.mousepoz.x
            this.pozY = this.mousepoz.y
        },
        moved:function(pid){
            req.post('move',{id:this.el.id,npid:pid})
            .then((res)=>{
                if (res.data == 'done'){
                    this.display = 'none'
                    var oldpid = this.el.pid
                    this.el.pid = pid
                    this.$bus.emit('moved',{npid:pid,el:this.el,opid:oldpid})
                }else{
                    this.$bus.emit('movecancel')
                }
            })
        },
        cancel(){
            this.$bus.emit('movecancel')
            this.el = ''
            this.display = 'none'
        },
        pan:function(e){
            if(this.pid != 0){
                this.Y = this.pozY + e.deltaY
                this.X = this.pozX + e.deltaX
            }
        },
        panend:function(){
            this.pozX = this.X
            this.pozY = this.Y
        },
    }
}
</script>
<style scoped>
.window{
    background-color:black;
    color:white;
    opacity: 0.9;
}
.win{
    position: absolute;
    /* width:50%; */
}
.winbar{
    width:100% !important;
    background-color:black;
    cursor:pointer;
}
.title{
    color:white;
}
.barbtns{
    margin-right:-15px;
}
</style>
<template>
    <div>
        <div class="window full shadow" :style="shadowstyle">
        </div>
        <div class="window win container-fluid" ref="delbox" :style="style">
            <div class="winbar d-flex" v-hammer:pan="pan" v-hammer:panend="panend">
                <div class="barbtns">
                    <a class="btn btn-danger" v-on:click="cancel()">x</a>
                </div>
            </div>
            <div class="main">
                <div>
                    {{el.title}}
                </div>
            </div>
            <div class="btns">
                <button type="button" class="btn btn-primary" v-on:click="del()">Delete</button>
                <button type="button" class="btn btn-secondary" v-on:click="cancel()">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
import poz from '../assets/poz'
export default {
    name:"dele",
    data:function(){
        return{
            el:{},
            p:{
                X:30,
                Y:10,
                zIndex:1,
                pozX:30,
                pozY:10,
                W:"",
                display:"none"
            },
            border:"solid 2px red",
            mousepoz:{x:0,y:0},
            blur:5
        }
    },
    created(){
        this.$bus.on('delete',this.toDel)
    },
    computed:{
        style(){
            return {left:this.p.X+"px",top:this.p.Y+"px",zIndex:this.p.zIndex,width:this.p.W,border:this.border,filter:"blur("+this.blur+"px)"}
        },
        shadowstyle(){
            return {display:this.p.display}
        },
    },
    methods:{
        setpoz:function(){
            var div = $('#masterdiv')[0]
            this.p.W = poz.setWidth(div.clientWidth)
            this.p.X = poz.keepInWin(this.mousepoz.x,this.p.W,div.clientWidth)
            this.p.Y = poz.keepInWin(this.mousepoz.y,this.$refs.delbox.offsetHeight,div.clientHeight)
            this.p.W = this.p.W+'px'
        },
        show:function(dat){
            this.p.display = 'block'
            this.p.zIndex=21
            this.mousepoz = dat.e.center
            this.setpoz()            
            this.panend()
            this.$bus.emit('blur',3)
            this.blur = 0
        },
        toDel:function(p){
            this.show(p);
            this.el = p.el
        },
        del:function(){
            $('#del'+this.el.id).modal('toggle')
            req.post('del',{id:this.el.id})
            .then((res)=>{
                if(res.data != "mis"){
                    this.$bus.emit('delc'+this.el.pid,this.el)
                }
            })
        },
        pan:function(e){
            this.p.Y = this.p.pozY + e.deltaY
            this.p.X = this.p.pozX + e.deltaX
        },
        panend:function(){
            this.p.pozX = this.p.X
            this.p.pozY = this.p.Y
        },
        cancel(){
            this.p.zIndex=1
            this.p.display = 'none'
            this.$bus.emit('blur',0)
            this.blur = 5
        }
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
    padding:0px;
    /* width:50%; */
}
.winbar{
    width:100% !important;
    background-color:black;
    cursor:pointer;
}
.barbtns a{
}
.title{
    color:white;
}
.barbtns{
    margin-right:-15px;
    width:100%;
    text-align:right;
}
.full{
    top:0px;
    position: absolute;;
    width:100%;
    height:100%;
    border:none;
    z-index:20;
    opacity: 0.5;
}
.main{
    padding:0px 10px;
}
.btns{
    text-align:right;
}
.times{
    margin:5px 5px;
    font-size:10px;
    float:left;
}
</style>
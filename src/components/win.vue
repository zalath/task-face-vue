<template>
    <div :class=wintype :style=style v-hammer:pan="pan" v-hammer:panend="panend" v-hammer:tap="tap">
        <div class="winbar d-flex">
            <div class="title p-2 flex-grow-1">{{title}}</div>
            <div v-if="pid != 0" class="barbtns">
                <a class="btn btn-danger" v-on:click="minimize">_</a>
                <a class="btn btn-danger" v-on:click="normalize">□</a>
                <a class="btn btn-danger" v-on:click="close">x</a>
            </div>
        </div>
        <!-- <tre :els="els" :pid="pid"></tre> -->
        <!-- <hr> -->
        <template v-for="(el,i) in els">
            <el :el="el" :key="i"></el>
        </template>
    </div>
</template>
<script>
import req from "../assets/req"
// import tre from "./tre"
import el from "./el"
export default {
    name:"win",
    components:{
        // tre,
        el
    },
    props:{
        type: String,//is fullscreen,full/win
        etype: String,//els's list's type
        pid: Number,
        poz: Number,
        title: String,
        mousepoz: {x:0,y:0}
    },
    computed:{
        treeid(){
            if(this.pid == undefined)
            return 0
            else return this.pid
        },
        wintype(){
            var c = ''
            if(this.type == 'win'){
                c = 'container'
            }
            return "window "+this.type+" "+c;
        },
        style(){
            return {left:this.X+"px",top:this.Y+"px",zIndex:this.zIndex,width:this.W+'%',border:this.border}
        }
    },
    data: function(){
        return {
            els:[],
            X:10,
            Y:10,
            zIndex:1,
            pozX:10,
            pozY:10,
            W:50,
            border:"solid 1px red",
            isShowTree:true
        }
    },
    created(){
        this.loadEls()
        this.$bus.on('showwin',this.show)
        this.$bus.emit('showwin',this.pid)
        if(this.type == 'full')this.W = 100
        this.X += 10 * (this.poz -1) + this.mousepoz.x - 60*this.poz
        this.Y += 10 * (this.poz -1) + this.mousepoz.y - 20*this.poz
        this.pozX += this.mousepoz.x -60*this.poz
        this.pozY += this.mousepoz.y -20*this.poz

        this.$bus.on('create'+this.pid,this.newEl)
        this.$bus.on('delc'+this.pid,this.delc)
    },
    methods:{
        close:function(){
            this.$bus.emit('closewin',this.pid);
        },
        loadEls:function(){
            req.post(this.etype,{id:this.pid})
            .then((res)=>{
                this.els = res.data
            })
        },
        show:function(pid){
            if(this.pid == pid){
                this.zIndex = 2;
                this.border = "solid 1px white"
                setTimeout(() => {
                    this.border = "solid 1px red"
                }, 200);
            }else this.zIndex=1;
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
        tap:function(){
            if(this.pid != 0)this.$bus.emit('showwin',this.pid)
        },
        minimize:function(){
            this.isShowTree = false
        },
        normalize:function(){
            this.isShowTree = true
        },
        newEl:function(el){
            this.els.push(el);
        },
        delc:function(el){
            var i = this.els.map(item => item.pid).indexOf(el.id)
            this.els.splice(i,1);
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
    /* width:50%; */
}
.full{
    position: absolute;;
    /* width:100%; */
    height:100%;
    border:none;
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
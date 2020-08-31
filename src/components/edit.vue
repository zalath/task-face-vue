<template>
    <div>
        <div class="window full shadow" :style="shadowstyle">
        </div>
        <div class="window win container-fluid" ref="editbox" :style="style">
            <div class="winbar d-flex" v-hammer:pan="pan" v-hammer:panend="panend">
                <div class="barbtns">
                    <div :style="'float: left;width: 10px;height: 10px;margin-top: 9px;margin-left: 6px;background-color:'+tikstate"></div>
                    <span class="times">
                        {{this.el.begintime}} -- {{this.el.endtime}}
                    </span>
                    <a class="btn btn-danger" v-on:click="cancel()">x</a>
                </div>
            </div>
            <div class="main">
                <div>
                    <textarea class="txt" rows="4" v-if="type == 'edit'" name="title" v-model="title" placeholder="title here"></textarea>
                    <textarea class="txt" rows="4" v-if="type == 'new'" name="title" v-model="newtitle" placeholder="title here"></textarea>
                </div>
                <div>
                    <textarea class="txt" rows="4" v-if="type == 'edit'" name="cmt" v-model="cmt" placeholder="comment here"></textarea>
                    <textarea class="txt" rows="4" v-if="type == 'new'" name="cmt" v-model="newcmt" placeholder="comment here"></textarea>
                </div>
            </div>
            <div class="btns">
                <button type="button" class="btn btn-primary" v-on:click="post()">Save</button>
                <button type="button" class="btn btn-secondary" v-on:click="cancel()">Close</button>
            </div>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
import poz from '../assets/poz'
export default {
    name:"edit",
    data:function(){
        return{
            pid:0,
            el:{},
            type:"",
            p:{
                X:30,
                Y:10,
                zIndex:1,
                pozX:30,
                pozY:10,
                W:"",
                display:'none',
            },
            border:"solid 2px red",
            mousepoz:{x:0,y:0},
            newtitle:"",
            newcmt:"",
            blur:5
        }
    },
    computed:{
        style(){
            return {left:this.p.X+"px",top:this.p.Y+"px",zIndex:this.p.zIndex,width:this.p.W,border:this.border,filter:"blur("+this.blur+"px)"}
        },
        shadowstyle(){
            return {display:this.p.display}
        },
        tikstate(){
            switch(this.el.tik){
                case 1:
                    return "lightgray"
                case 0:
                    return "green"
                case 2:
                    return "red"
                default:
                    return "none"
            }
        },
        title:{
            get:function(){
                return this.el.title
            },
            set:function(val){
                this.newtitle = val
            }
        },
        cmt:{
            get:function(){
                return this.el.cmt
            },
            set:function(val){
                this.newcmt = val
            }
        }
    },
    created(){
        this.$bus.on("newEl",this.onNew)
        this.$bus.on("editEl",this.onEdit)
        this.newtitle = this.title
        this.newcmt = this.cmt
    },
    methods:{
        show:function(dat){
            this.p.display = 'block'
            this.p.zIndex=21
            this.mousepoz = dat.e.center
            this.setpoz()            
            this.panend()
            this.$bus.emit('blur',3)
            this.blur = 0
        },
        onNew(p){
            this.show(p)
            this.type = "new"
            this.pid = p.pid
        },
        onEdit(p){
            this.show(p)
            this.type = "edit"
            this.el = p.el
        },
        post:function(){
            if(this.type == 'new'){
                req.post('new',{title:this.newtitle,pid:this.pid,cmt:this.newcmt})
                .then((res)=>{
                    if(res.data != 'mis'){
                        req.post('el',{id:res.data}).then((res)=>{
                            if(res.status){
                                this.$bus.emit('create'+this.pid,res.data)
                            }
                        })
                    }
                })
            }else{
                req.post('save',{"id":this.el.id,"title":this.newtitle,cmt:this.newcmt})
                .then((res)=>{
                    if(res.data != "mis"){
                        this.$bus.emit('change'+this.el.id,{title:this.newtitle,cmt:this.newcmt})
                    }
                })
            }
            this.cancel()
        },
        setpoz:function(){
            var div = $('#masterdiv')[0]
            this.p.W = poz.setWidth(div.clientWidth)
            this.p.X = poz.keepInWin(this.mousepoz.x,this.p.W,div.clientWidth)
            this.p.Y = poz.keepInWin(this.mousepoz.y,this.$refs.editbox.offsetHeight,div.clientHeight)
            this.p.W = this.p.W+'px'
        },
        cancel(){
            this.p.zIndex=1
            this.p.display = 'none'
            this.$bus.emit('blur',0)
            this.blur = 5
        },
        pan:function(e){
            this.p.Y = this.p.pozY + e.deltaY
            this.p.X = this.p.pozX + e.deltaX
        },
        panend:function(){
            this.p.pozX = this.p.X
            this.p.pozY = this.p.Y
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
.txt{
    width:100%;
    border:none;
    background-color:black;
    color:white;
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
<template>
    <div>
        <div class="window full shadow" :style="shadowstyle">
        </div>
        <div class="window win container-fluid" ref="editbox" :style="style">
            <div class="winbar d-flex" v-hammer:pan="pan" v-hammer:panend="panend">
                <div class="barbtns">
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
    name:"dele",
    props:{
        pid:Number,
        el:{},
        type:String
    },
    data:function(){
        return{
            X:30,
            Y:10,
            zIndex:1,
            pozX:30,
            pozY:10,
            W:"",
            border:"solid 2px red",
            display:'none',
            mousepoz:{x:0,y:0},
            newtitle:"",
            newcmt:"",
            blur:5
        }
    },
    computed:{
        style(){
            return {left:this.X+"px",top:this.Y+"px",zIndex:this.zIndex,width:this.W,border:this.border,filter:"blur("+this.blur+"px)"}
        },
        shadowstyle(){
            return {display:this.display}
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
        this.$bus.on(this.type+"El"+this.el.id,this.show)
        this.newtitle = this.title
        this.newcmt = this.cmt
    },
    methods:{
        show:function(dat){
            this.display = 'block'
            this.zIndex=21
            this.mousepoz = dat.e.center
            this.setpoz()            
            this.panend()
            this.$bus.emit('blur',3)
            this.blur = 0
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
            this.W = poz.setWidth(div.clientWidth)
            this.X = poz.keepInWin(this.mousepoz.x,this.W,div.clientWidth)
            this.Y = poz.keepInWin(this.mousepoz.y,this.$refs.editbox.offsetHeight,div.clientHeight)
            this.W = this.W+'px'
        },
        cancel(){
            this.zIndex=1
            this.display = 'none'
            this.$bus.emit('blur',0)
            this.blur = 5
        },
        pan:function(e){
            this.Y = this.pozY + e.deltaY
            this.X = this.pozX + e.deltaX
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
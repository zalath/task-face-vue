<template>
    <div>
        <div class="window full shadow" :style="shadowstyle">
        </div>
        <div class="window win container-fluid" :style="style" v-hammer:pan="pan" v-hammer:panend="panend">
            <div class="winbar d-flex">
                <div class="barbtns">
                    <a class="btn btn-danger" v-on:click="cancel()">x</a>
                </div>
            </div>
            <div>
                <textarea class="txt" rows="4" v-if="type == 'edit'" name="title" v-model="title" placeholder="title here"></textarea>
                <textarea class="txt" rows="4" v-if="type == 'new'" name="title" v-model="newtitle" placeholder="title here"></textarea>
            </div>
            <div>
                <textarea class="txt" rows="4" placeholder="comment here" name="cmt" v-model="cmt"></textarea>
            </div>
            <div>
                <button type="button" class="btn btn-secondary" v-on:click="cancel()">Close</button>
                <button type="button" class="btn btn-primary" v-on:click="post()">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
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
            zIndex:11,
            pozX:30,
            pozY:10,
            W:"",
            border:"solid 1px red",
            display:'none',
            mousepoz:{x:0,y:0},
            newtitle:"",
            newcmt:""
        }
    },
    computed:{
        style(){
            return {left:this.X+"px",display:this.display,top:this.Y+"px",zIndex:this.zIndex,width:this.W,border:this.border}
        },
        shadowstyle(){
            return {display:this.display}
        },
        title:{
            get:function(){
                return JSON.parse(JSON.stringify(this.el.title))
            },
            set:function(val){
                this.newtitle = val
            }
        },
        cmt:{
            get:function(){
                return JSON.parse(JSON.stringify(this.el.cmt))
            },
            set:function(val){
                this.newcmt = val
            }
        }
    },
    created(){
        this.$bus.on(this.type+"El"+this.el.id,this.show)
    },
    methods:{
        show:function(dat){
            this.display = 'block'
            this.mousepoz = dat.e.center
            this.setpoz()
            this.W = document.body.clientWidth-60+"px",
            this.X = document.body.clientWidth < (this.X+this.W)? document.body.clientWidth-this.W:this.X;
            this.$bus.emit('blur',3)
        },
        post:function(){
            $('#'+this.type+this.el.id).modal('toggle')
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
                    this.display = 'none'
                })
            }else{
                req.post('save',{"id":this.el.id,"title":this.newtitle,cmt:this.newcmt})
                .then((res)=>{
                    if(res.data != "mis"){
                        this.$bus.emit('change'+this.el.id,this.newtitle)
                    }
                    this.display = 'none'
                })
            }
        },
        setpoz:function(){
            // this.X = this.mousepoz.x
            // this.pozX = this.mousepoz.x

            this.Y = this.mousepoz.y
            this.pozY = this.mousepoz.y
        },
        cancel(){
            this.display = 'none'
            this.$bus.emit('blur',0)
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
    z-index:10;
    opacity: 0.5;
}
</style>
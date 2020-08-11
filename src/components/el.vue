<template>
    <div class="line container">
        <div class="row">
            <a class="btn btn-primary" v-hammer:tap="toTik">
                <div class="tik" :style="tikstyle"></div>
            </a>
            <a type="button" class="btn btn-primary col-sm-9 el" data-toggle="modal" :data-target="'#edit'+el.id">{{el.id}}-{{el.title}}</a>
            
            <span class="showhide btn btn-primary" v-if="isOpen==true" v-on:click="open('list')">{{el.ct}}</span>
            <span class="showhide btn btn-primary" v-if="isOpen==false" v-on:click="fold()">-</span>

            <span class="showhide btn btn-primary" v-if="isShowWin==true" v-hammer:tap="openWin">+></span>
            <span class="showhide btn btn-primary" v-if="isShowWin==false" v-hammer:tap="openWin">></span>
            <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">+</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">x</button>
            
            <button type="button" class="btn btn-primary" v-if="isMoving==false" v-hammer:tap="moveStart" data-toggle="modal" data-target="#moving">&gt;</button>
            <button type="button" class="btn btn-primary" v-if="isMoving==true" v-on:click="move()">&lt;</button>
            </div>
        </div>
        <div v-if="isShowChild==true">
            <div v-for="(el) in el.Child" :key="'child'+el.id">
                <el :el="el"></el>
            </div>
        </div>
    </div>
</template>
<script>
import req from "../assets/req"
export default {
    name:"el",
    components:{
    },
    props:{
        el: {},
    },
    data: function(){
        return {
            isOpen: true,
            isShowWin:false,
            isShowChild:false,
            isMoving:false,
            tik:""
        }
    },
    created(){
        if(this.el.Child != null)
            this.$bus.emit('showChild'+this.el.id,true)
        this.$bus.emit('addhandle',this.el)//add handle button
        this.$bus.on('create'+this.el.id,this.newEl)
        this.$bus.on('change'+this.el.id,this.change)
        this.$bus.on('delc'+this.el.id,this.delc)
        this.$bus.on('closewin',this.closeWin)
        this.$bus.on('winopened'+this.el.id,this.winOpened)
        this.$bus.on('tomove',this.toMove)
        this.$bus.on('moved',this.moved)
        this.$bus.on('movecancel',this.moveCancel)
        this.$bus.on('tik'+this.el.id,this.tikk)
    },
    computed:{
        tikstyle(){
            switch(this.el.tik){
                case 0:
                    return {backgroundColor:"lightgray !important"}
                case 1:
                    return {backgroundColor:"green !important"}
                case 2:
                    return {backgroundColor:"red !important"}
                default:
                    return {backgroundColor:"white !important"}
            }
        }
    },
    beforeDestroy(){
        this.$bus.off('moved',this.moved)
    },
    mounted(){
        this.isct()
    },
    methods:{
        toTik(e){
            this.$bus.emit('totik',{el:this.el,e:e})
        },
        tikk(tik){
            this.el.tik = tik
        },
        isct(){
            if(this.el.ct == 0){
                this.show(4,4,4)
            }
            if(this.el.ct > 0){
                this.show(false,true,false)
            }
        },
        moveStart:function(e){
            var nowel = this.el
            this.$bus.emit('tomove',{el:nowel,e:e})
        },
        toMove:function(dat){
            this.isMoving = true
            if(this.el.id == dat.el.id){
                this.isMoving = 4
            }
        },
        move(){
            this.$bus.emit('move',this.el.id)
        },
        moved:function(dat){
            if(this.el.id == dat.npid){
                this.ct("1")
                if(this.el.Child != null){
                    this.el.Child.push(dat.el)
                }
            }
            if(this.el.id == dat.opid){
                this.delc(dat.el)
            }
            this.isMoving = false
        },
        moveCancel(){
            this.isMoving = false
        },
        open:function(type){
            if(this.el.Child == null){
                req.post(type,{id:this.el.id})
                .then((res)=>{
                    this.el.Child = res.data
                })
            }
            this.show(true,false,0)
        },
        fold:function(){
            this.show(false,true,0)
        },
        openWin:function(e){
            this.show(0,0,true)
            this.$bus.emit('openwin',{type:'win',etype:'list',pid:this.el.id,title:this.el.title,mousepoz:e.center})
            this.$bus.emit('winopened'+this.el.id)
        },
        winOpened:function(){
            this.show(0,0,true)
        },
        closeWin:function(id){
            if(id == this.el.id)
            this.show(0,0,false)
        },
        show:function(isSC,isO,isSW){
            if(isSC !== 0)this.isShowChild = isSC
            if(isO !== 0)this.isOpen = isO
            if(isSW !== 0)this.isShowWin = isSW
        },
        ct:function(dat){
            if(dat =='1')
                this.el.ct +=1
            else this.el.ct -=1
            this.isct()
        },
        change(title){
            this.el.title = title
        },
        newEl(dat){
            this.ct("1")
            this.el.Child.push(dat)
        },
        delc(el){
            this.ct("-1")
            if(this.el.Child != null){
                var i = this.el.Child.map(item => item.id).indexOf(el.id)
                this.el.Child.splice(i,1)
            }
        },
    }
}
</script>
<style scoped>
.line{
    text-align:left;
    margin:10px 10px;
}
.showhide{
    cursor: pointer;
}
.el{
    text-align: left;
}
.tik{
    height:12px;
    width:12px;
    border-radius:6px;
    margin-top:7px;
}
.line:hover{
    background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
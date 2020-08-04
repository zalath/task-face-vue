<template>
    <div class="line container">
        <div class="row">
            <button type="button" class="btn btn-primary col-sm-5" data-toggle="modal" :data-target="'#edit'+el.id">{{el.id}}-{{el.title}}</button>
            
            <span class="showhide btn btn-primary" v-if="isOpen==true" v-on:click="open('list')">{{el.ct}}</span>
            <span class="showhide btn btn-primary" v-if="isOpen==false" v-on:click="fold()">-</span>

            <span class="showhide btn btn-primary" v-if="isShowWin==true" v-hammer:tap="openWin">+></span>
            <span class="showhide btn btn-primary" v-if="isShowWin==false" v-hammer:tap="openWin">></span>
            
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">+</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">x</button>
        </div>
        <div v-if="isShowChild==true">
            <div v-for="(el,i) in el.Child" :key="i">
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
            isShowChild:false
        }
    },
    created(){
        
        if(this.el.Child != null)
            this.$bus.emit('showChild'+this.el.id,true)
        this.$bus.emit('addhandle',this.el)//add handle button
        this.$bus.on('create'+this.el.id,this.newEl)
        this.$bus.on('change'+this.el.id,this.change)
        this.$bus.on('delc'+this.el.id,this.delc)
        this.$bus.on('ct'+this.el.id,this.ct)
        this.$bus.on('closewin',this.closeWin)
        this.$bus.on('winopened'+this.el.id,this.winOpened)
    },
    computed:{
    },
    watch:{
    },
    mounted(){
        this.isct()
    },
    methods:{
        isct(){
            if(this.el.ct == 0){
                this.show(4,4,4)
            }
            //it has child
            if(this.el.ct > 0){
                this.show(false,true,false)
            }
            //if it is already opened
            if(this.el.Child != null && this.el.Child.length > 0){
                this.show(true,false,false)
            }
        },
        toMove:function(){

        },
        move:function(){

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
            this.el.Child.push(dat)
        },
        delc(el){
            var i = this.el.Child.map(item => item.pid).indexOf(el.id)
            this.el.Child.splice(i,1)
        },
    }
}
</script>
<style scoped>
.line{
    text-align:left;
    margin:10px 40px;
}
.showhide{
    cursor: pointer;
}
</style>
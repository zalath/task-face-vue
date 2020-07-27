<template>
    <div class="line container">
        <div class="row">
            <button type="button" class="btn btn-primary col-sm-5" data-toggle="modal" :data-target="'#edit'+el.id">{{el.id}}-{{el.title}}</button>
            
            <span class="showhide btn btn-primary" v-if="isOpen" v-on:click="open('list')">[{{el.ct}}]</span>
            <span class="showhide btn btn-primary" v-if="isFold" v-on:click="fold()">[-]</span>

            <span class="showhide btn btn-primary" v-if="isOpenWin" v-on:click="openWin('list')">>></span>
            
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">+</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">x</button>
        </div>
        <template v-if="isShowChild">
            <div v-for="(elc,i) in el.Child" :key="i">
                <el :el=elc :type=type :pid=el.id></el>
            </div>
        </template>

        <edit :pid=el.pid :el=el :type="'edit'"></edit>
        <edit :pid=el.id :el=el :type="'new'"></edit>
        <dele :el=el ></dele>
    
    </div>
</template>
<script>
import req from "../assets/req"
import edit from "./edit"
import dele from "./dele"
export default {
    name:"el",
    components:{
        edit,
        dele
    },
    props:{
        type: String,
        el: {},
    },
    data: function(){
        return {
            isShowChild:false,
            isOpenWin:true,
            isOpen: true,
            isFold: false
        }
    },
    created(){
        if(this.el.ct == 0){
            this.isOpen = false;
            this.isFold = false;
            this.isOpenWin = false;
        }
        //if do not have next level,or is already opened
        if(this.el.ct > 0 && this.el.Child != null && this.el.Child.length > 0){
            this.isOpen = false;
            this.isFold = true;
        }
        if(this.el.Child != null)
            this.isShowChild = true
        this.$bus.on('delc'+this.el.id,this.delc)
    },
    methods:{
        toMove:function(){

        },
        move:function(){

        },
        delc:function(dat){//when child is deleted
            var i = this.el.Child.map(item => item.id).indexOf(dat.cid)
            this.el.Child.splice(i,1)
            this.el.ct -= 1;
        },
        open:function(type){
            if(this.el.Child == null){
                req.post(type,{id:this.el.id})
                .then((res)=>{
                    this.el.Child = res.data
                })
            }
            this.isShowChild = true
            this.isOpen = false
            this.isFold = true
        },
        fold:function(){
            this.isShowChild = false
            this.isOpen = true
            this.isFold = false
        },
        openWin:function(type){
            this.$bus.emit('openwin',{type:'win',etype:type,pid:this.el.id,title:this.el.title})
        }
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
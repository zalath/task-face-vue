<template>
    <div class="line container">
        <div class="row">
            <button type="button" class="btn btn-primary col-sm-5" data-toggle="modal" :data-target="'#edit'+el.id">{{el.id}}-{{el.title}}</button>
            
            <span class="showhide btn btn-primary" v-if="isOpen" v-on:click="open('list')">[{{el.ct}}]</span>
            <span class="showhide btn btn-primary" v-if="isFold" v-on:click="fold()">[-]</span>

            <span class="showhide btn btn-primary" v-if="isOpenWin" v-hammer:tap="openWin">>></span>
            
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">+</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">x</button>
        </div>
        <template v-if="isShowChild">
            <div v-for="(elc,i) in el.Child" :key="i">
                <el :el=elc :type=type :pid=el.id></el>
            </div>
        </template>
    </div>
</template>
<script>
import req from "../assets/req"
export default {
    name:"el",
    components:{
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
        this.$bus.emit('addhandle',this.el)
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
            this.show(true,false,true)
        },
        fold:function(){
            this.show(false,true,false)
        },
        openWin:function(e){
            this.$bus.emit('openwin',{type:'win',etype:'list',pid:this.el.id,title:this.el.title,mousepoz:e.center})
        },
        show(isShowChild,isOpen,isFold){
            this.isShowChild = isShowChild
            this.isOpen = isOpen
            this.isFold = isFold
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
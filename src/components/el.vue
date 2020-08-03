<template>
    <div class="line container">
        <div class="row">
            <button type="button" class="btn btn-primary col-sm-5" data-toggle="modal" :data-target="'#edit'+el.id">{{el.id}}-{{el.title}}</button>
            
            <span class="showhide btn btn-primary" v-if="isOpen" v-on:click="open('list')">{{el.ct}}</span>
            <span class="showhide btn btn-primary" v-if="isFold" v-on:click="fold()">-</span>

            <template v-if="isOpenWin">
            <span class="showhide btn btn-primary" v-if="isShowWin" v-hammer:tap="openWin">+>></span>
            <span class="showhide btn btn-primary" v-else v-hammer:tap="openWin">>></span>
            </template>
            
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">+</button>
            <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">x</button>
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
            isOpenWin:true,
            isOpen: true,
            isFold: false,
            isShowWin:false
        }
    },
    created(){
        this.isct()
        if(this.el.Child != null)
            this.$bus.emit('showChild'+this.el.id,true)
        this.$bus.emit('addhandle',this.el)//add handle button
        this.$bus.on('ct'+this.el.id,this.ct)
        this.$bus.on('change'+this.el.id,this.change)
    },
    computed:{
        ctwatch:function(){
            return this.el.ct
        }
    },
    watch:{
        ctwatch:function(val){
            if(val > 0){
                this.isct()
            }
        }
    },
    methods:{
        isct(){
            if(this.el.ct == 0){
                this.isOpen = false;
                this.isFold = false;
                this.isOpenWin = false;
            }
            //if it does not have next level,or is already opened
            if(this.el.ct > 0 && this.el.Child != null && this.el.Child.length > 0){
                this.isOpen = false;
                this.isFold = true;
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
            this.show(true,false,true)
        },
        fold:function(){
            this.show(false,true,false)
        },
        openWin:function(e){
            this.isShowWin = true
            this.$bus.on('closewin'+this.el.id,this.closewWin);
            this.$bus.emit('openwin',{type:'win',etype:'list',pid:this.el.id,title:this.el.title,mousepoz:e.center})
        },
        closeWin:function(){
            this.isShowWin = false
        },
        show(isShowChild,isOpen,isFold){
            this.$bus.emit('showChild'+this.el.id,isShowChild)
            this.isOpen = isOpen
            this.isFold = isFold
        },
        ct:function(dat){
            if(dat =='1')
                this.el.ct +=1;
            else this.el.ct -=1;
        },
        change(title){
            this.el.title = title
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
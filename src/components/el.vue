<template>
    <div class="line">
        <div>
        <span>{{el.id}}</span>-
        <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#edit'+el.id">{{el.title}}</button>
        
        <span v-if="isOpenNew" v-on:click="openNew('list')">[{{el.ct}}]</span>
        <span v-if="isOpen" v-on:click="open()">[{{el.ct}}]</span>
        <span v-if="isFold" v-on:click="fold()">[-]</span>
        
        <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#new'+el.id">[ADD]</button>
        <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#del'+el.id">[DEL]</button>
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
            isOpenNew: true,//if this point is opend
            isShowChild:false,
            isOpen: false,
            isFold: false
        }
    },
    created(){
        if(this.el.ct == 0){
            this.isOpen = false;
            // this.isOpenNew = false;
            this.isFold = false;
        }
        //if do not have next level,or is already opened
        if(this.el.ct > 0 && this.el.Child != null && this.el.Child.length > 0){
            this.isOpenNew = false;
            this.isOpen = false;
            this.isFold = true;
        }
        if(this.el.Child != null)
            this.isShowChild = true
    },
    methods:{
        toAdd:function(){

        },
        toMove:function(){

        },
        move:function(){

        },
        toDelete:function(){

        },
        delete:function(){
        },
        openNew:function(type){
            req.post(type,{id:this.el.id})
            .then((res)=>{
                this.el.Child = res.data
                this.isShowChild = true
                this.isOpenNew = false;
                this.isOpen = false;
                this.isFold = true;
            })
        },
        open:function(){
            this.isShowChild = true
            this.isOpen = false
            this.isFold = true
        },
        fold:function(){
            this.isShowChild = false
            this.isOpen = true
            this.isFold = false
        }
    }
}
</script>
<style scoped>
.line{
    text-align:left;
    margin:10px 40px;
}
</style>
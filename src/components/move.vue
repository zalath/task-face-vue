<template>
    <div class="modal fade" :id="'del'+el.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Deleting</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span name="title" >{{el.title}}</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" v-on:click="del()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
export default {
    name:"dele",
    data:function(){
        return{
            el:'',
            pid:''
        }
    },
    created(){
        this.$bus.on('',this.moving)
        this.$bus.on('',this.moved)
    },
    methods:{
        moving:function(id){
            this.$bus.emit('tomove',id)
            this.id = id
        },
        moved:function(pid){
            this.$bus.emit('moved',id)
            req.post('move',{id:this.el.id,npid:this.pid})
            .then((res)=>{
                this.$bus.emit('moved',{npid:this.pid,pid:this.el.pid,el:this.el})
            })          
        },
        del:function(){
            $('#del'+this.el.id).modal('toggle')
            req.post('del',{id:this.el.id})
            .then((res)=>{
                if(res.data != "mis"){
                    this.$bus.emit('delc'+this.el.pid,{cid:this.el.id})
                    this.$bus.emit('ct'+this.el.pid,'-1')
                }
            })
        }
    }
}
</script>
<style scoped>
.modal{
    color:black;
}
</style>
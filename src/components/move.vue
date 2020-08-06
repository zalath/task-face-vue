<template>
    <div class="modal fade" id="moving" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Moving</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- <div class="modal-body">
                </div> -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="cancel()">Cancel</button>
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
        }
    },
    created(){
        this.$bus.on('tomove',this.moving)
        this.$bus.on('move',this.moved)
    },
    methods:{
        moving:function(el){
            this.el = el
        },
        moved:function(pid){
            req.post('move',{id:this.el.id,npid:pid})
            .then((res)=>{
                if (res.data == 'done'){
                    console.log('---------------------------------')
                    console.log('moved:'+pid+'<-'+this.el.id)
                    this.$bus.emit('moved',{npid:pid,el:this.el})
                }else{
                    this.$bus.emit('movecancel')
                }
            })
        },
        cancel(){
            this.$bus.emit('movecancel')
            this.el = ''
        }
    }
}
</script>
<style scoped>
.modal{
    color:black;
}
.modal-backdrop {
    opacity: 0 !important;
    filter: alpha(opacity=0) !important;
}
</style>
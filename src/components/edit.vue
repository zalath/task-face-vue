<template>
    <div class="modal fade" :id="'edit'+el.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input name="title" v-model="el.title">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import req from '../assets/req'
export default {
    name:"edit",
    props:{
        pid:Number,
        el:{}
    },
    data:function(){
        return {
            isnew: false
        }
    },
    created(){
        if(this.el == undefined){
            this.el.title = ''
            this.isnew = true;
        }
    },
    methods:{
        post:function(){
            if(this.isnew){
                req.post('new',this.el)
                .then(function(res){
                    console.log(res)
                })
            }else{
                req.post('save',{"id":this.el.id,"title":this.el.title})
                .then(function(res){
                    console.log(res)
                })
            }
        }
    }
}
</script>
<style scoped>
.shade{
    width:100%;
    height:100%;
    position:fixed;
    background-color:#333;
    left:0px;
    top:0px;
    opacity:0.3;
}
.editwin{
    border-bottom:solid 1px red;
    width:50%;
    margin:auto;
}
.close{
    height:10px;
    background-color: red;
    cursor:pointer;
}
</style>
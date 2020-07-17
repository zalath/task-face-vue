<template>
    <div class="modal fade" :id="type+el.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input v-if="type == 'edit'" name="title" v-model="title">
                    <input v-if="type == 'new'" name="title" v-model="newtitle">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="post()">Save</button>
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
        el:{},
        type:String,//current win type(new/edit)
    },
    data:function(){
        return {
            newtitle:"",
        }
    },
    created(){
    },
    computed:{
        title:{
            get:function(){
                return JSON.parse(JSON.stringify(this.el.title))
            },
            set:function(val){
                this.newtitle = val
            }
        }
    },
    methods:{
        post:function(){
            $('#'+this.type+this.el.id).modal('toggle')
            if(this.type == 'new'){
                req.post('new',{title:this.newtitle,pid:this.pid})
                .then((res)=>{
                    if(res.data != 'mis'){
                        req.post('el',{id:res.data}).then((res)=>{
                            if(res.status){
                                this.el.ct = this.el.ct+1
                                if(this.el.Child != null)
                                    this.el.Child.push(res.data)
                            }
                        })
                    }
                })
            }else{
                req.post('save',{"id":this.el.id,"title":this.newtitle})
                .then((res)=>{
                    if(res.data != "mis"){
                        this.el.title = this.newtitle
                    }
                })
            }
        }
    }
}
</script>
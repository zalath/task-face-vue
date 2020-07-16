<template>
    <div>
        <div></div>
        <tre :pid=this.treeid :type="'space'" :els=els></tre>
    </div>
</template>
<script>
import req from "../assets/req"
import tre from "./tre";
export default {
    name:"win",
    components:{
        tre
    },
    props:{
        type: String,//is fullscreen,full/win
        etype: String,//els's list's type
        pid: Number
    },
    computed:{
        treeid(){
            if(this.pid == undefined)
            return 0
            else return this.pid
        }
    },
    data: function(){
        return {
            els:[]
        }
    },
    created(){
        this.loadEls()
    },
    methods:{
        close:function(){
        },
        loadEls:function(){
            req.post(this.etype,{id:'0'})
            .then((res)=>{
                this.els = res.data
            })
        }
    }
}
</script>
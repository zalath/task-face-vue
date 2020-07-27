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
            els:[],
            zindex:1
        }
    },
    created(){
        this.loadEls()
        this.$bus.on('showwin',this.show)
    },
    methods:{
        close:function(){
            this.$bus.emit('closewin',this.pid);
        },
        loadEls:function(){
            req.post(this.etype,{id:'0'})
            .then((res)=>{
                this.els = res.data
            })
        },
        show:function(pid){
            if(this.pid == pid)this.zindex = 10;
            else this.zidnex=5;
        }
    }
}
</script>
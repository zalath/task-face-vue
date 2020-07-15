<template>
    <div>
        <div></div>
        <tree :pid="this.treeid"></tree>
    </div>
</template>
<script>
import tree from "./tree";
export default {
    name:"win",
    components:{
        tree
    },
    props:{
        id: String,//pid
        type: String,//is fullscreen,full/win
        pid: String
    },
    computed:{
        treeid(){
            if(this.id == undefined)
            return '0'
            else return this.id
        }
    },
    data: function(){
        return {
            trees:{}
        }
    },
    created(){
    },
    methods:{
        close:function(){
        }
    }
}
</script>
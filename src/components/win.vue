<template>
    <div>
        <div></div>
        <tree :pid="this.id"></tree>
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
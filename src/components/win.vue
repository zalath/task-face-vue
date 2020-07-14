<template>
    <div>
        <div></div>
        <tree :pid="this.id"></tree>
    </div>
</template>
<script>
import tree from "./tree.vue";
export default {
    name:"win",
    components:{
        tree
    },
    props:{
        id: String,//pid
        type: String,//is fullscreen
        pid: String
    },
    data: function(){
        return {
            trees:{}
        }
    },
    created: ()=>{
        //see if the local tree have this node and return data directly
        //if not use pid to fetch tree

        //add listener of closing method
        //add listener of move method
    },
    methods:{
        close:function(){
        },
        move:function(){
        }
    }
}
</script>
<template>
    <div class="tree">
        <div v-for="(el,i) in els" :key="i">
            <el :el=el :type=type :pid=pid></el>
        </div>
    </div>
</template>
<script>
import el from "./el"
// import req from "../assets/req"
export default {
    name:"tre",
    components:{
        el
    },
    props:{
        pid: Number,
        type: String,
        els: Array
    },
    data: function(){
        return {
        }
    },
    created(){
        //add listener of closing method
        //add listener of move method
    },
    methods:{
    },
    computed:{
    },
    watch:{
    }
}
</script>
<style scoped>
.tree{
    margin-left:20px;
}
</style>
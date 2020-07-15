<template>
    <div>
        <div v-for="(el,i) in els" :key="i">
            <el :el=el></el>
        </div>
    </div>
</template>
<script>
import el from "./el"
import req from "../assets/req"
export default {
    name:"tree",
    components:{
        el
    },
    props:{
        pid: String
    },
    data: function(){
        return {
            els:[]
        }
    },
    created(){
        this.loadEls();
        //add listener of closing method
        //add listener of move method
    },
    methods:{
        loadEls:function(){
            req.post('list',{id:'0'})
            .then((res)=>{
                this.els = res.data
            })
        }
    },
    computed:{
    },
    watch:{
    }
}
</script>
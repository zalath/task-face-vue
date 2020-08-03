<template>
    <div class="tree">
        <div v-for="(el,i) in els" :key="'tree'+i">
            <el :el=el></el>
            <template v-if="isShowChild">
                <tre :els="el.Child" :pid="el.id"></tre>
            </template>
        </div>
    </div>
</template>
<script>
import el from "./el"
export default {
    name:"tre",
    components:{
        el
    },
    props:{
        pid: Number,
        els: Array
    },
    data: function(){
        return {
            isShowChild:false
        }
    },
    created(){
        this.$bus.on('showChild'+this.el.id,this.showChild)
        this.$bus.on('delc'+this.pid,this.delc)
        this.$bus.on('create'+this.pid,this.create)
    },
    methods:{
        showChild(is){
            this.isShowChild = is
        },
        delc(el){
            var i = this.els.map(item => item.pid).indexOf(el.id)
            this.els.splice(i,1);
        },
        create(el){
            this.els.push(el)
        }
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
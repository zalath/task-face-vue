<template>
    <div>
        <div v-for="(el,i) in els" :key="i">
            <!-- <line :el="el"></line> -->
            {{el.title}}
        </div>
    </div>
</template>
<script>
// import line from "./line"
export default {
    name:"tree",
    components:{
        // line
    },
    props:{
        pid: String
    },
    data: function(){
        return {}
    },
    created(){
        //add listener of closing method
        //add listener of move method
    },
    methods:{
        loadEls:function(){
            this.$store.commit("setcur",{'id':this.pid,'type':'list'})
            this.$store.dispatch("getEls");
        }
    },
    computed:{
        els(){
            this.loadEls();
            this.$store.commit("setcur",{'id':this.pid})
            return this.$store.getters.getEls
        }
    }
}
</script>
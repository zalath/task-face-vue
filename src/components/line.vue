<template>
    <div>
        <span>{{el.id}}</span>
        <span>{{el.title}}</span>
    </div>
</template>
<script>
export default {
    name:"line",
    components:{
    },
    props:{
        el: {},//pid
    },
    data: function(){
        return {
        }
    },
    created: ()=>{
    },
    methods:{
        tomove:function(){
        }
    }
}
</script>
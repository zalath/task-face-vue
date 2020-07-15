// import req from "./req"
export const els = {
    state:{
        // els: [],
        // elsready: [],
        // id: "",//current process using id for any purpose
        // type: "",//els's form type,list or space
    },
    mutations:{
        // setEls:function(state,res){
        //     console.log('setting')
        //     state.els[res.id] = res.el
        // },
        // setCur:function(state,cur){
        //     if(cur.id == undefined)
        //         cur.id = '0'
        //     state.id = cur.id
        //     if(cur.type != undefined)
        //         state.type = cur.type
        // },
        // setElsReady:function(state,d){
        //     state.elsready[d.id] = d.state
        // }
    },
    actions:{
        // getEls({commit,state}){
        //     var post;
        //     if(state.type == "list"){
        //         post = req.post("list",{id:state.id})
        //     }else{
        //         post = req.post("space",{id:state.id})
        //     }
        //     post.then(function(response){
        //         commit("setEls",{"id":state.id,"el":response.data})
        //         commit("setElsReady",{"id":state.id,"state":"ready"})
        //         console.log(state.elsready)
        //     })
        // }
    },
    getters:{
        // getEls(state){
        //     return state.els[state.id]
        // },
        // getElsReady(state){
        //     return state.els
        // }
    }
}
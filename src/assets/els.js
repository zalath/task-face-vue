import req from "./req"
export const els = {
    state:{
        els: [],
        id: "",//current process using id for any purpose
        type: "",//els's form type,list or space
    },
    mutations:{
        setEls:function(state,res){
            state.els[res.id] = res.el
        },
        setcur:function(state,cur){
            if(cur.id == undefined)
                cur.id = '0'
            state.id = cur.id
            if(cur.type != undefined)
                state.type = cur.type
        }
    },
    actions:{
        getEls({commit,state}){
            var post;
            if(state.type == "list"){
                post = req.post("list",{id:state.id})
            }else{
                post = req.post("space",{id:state.id})
            }
            post.then(function(response){
                commit("setEls",{"id":state.id,"el":response.data})
            })
        }
    },
    getters:{
        getEls(state){
            console.log(state.id)
            console.log(state.els)
            console.log('')
            console.log(state.els['0'])
            return state.els[state.id]
        }
    }
}
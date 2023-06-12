

export const reducerComment = (state,action)=>{
    switch(action.type){
        case 'first':
            return action.payload
        

        case 'add':{
            console.log(state.comments)
            console.log(action.payload)
            console.log({comments:[...state.comments,action.payload]})
            return {post:state.post,comments:[...state.comments,action.payload]}
        }
            
        
        default : return state
    }
}
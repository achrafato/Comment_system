

export const First_Render = (data)=>{
    return{
        type:"first",
        payload:data
    }
}


export const Add_Comment = (data)=>{
    return{
        type:"add",
        payload:data
    }
}
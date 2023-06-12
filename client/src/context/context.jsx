import {createContext,useState,useContext,useReducer} from "react"
import { reducerComment } from "./reducerComment"


const intialState = {
    post:{},
    comments:[]
}

const postContext = createContext()

export const usePostContext = ()=>{
    return useContext(postContext)
}

const ContextProvider = ({children}) => {
    const [postId,setPostId] = useState('')

    const [state,dispatch] = useReducer(reducerComment,intialState)
    
    return (
        <postContext.Provider value={{postId,setPostId,dispatch,state}}>
            {children}
        </postContext.Provider>
    )
}

export default ContextProvider
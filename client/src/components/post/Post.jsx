import React ,{useState,useEffect} from 'react'
import {usePostContext} from '../../context/context'
import CommentSection from '../comments/CommentSection'

import './post.css'

const Post = () => {
    const [comments,setComments] = useState([])
    const {state} = usePostContext()

    useEffect(()=>{
        //check if we have a post
        if(Object.entries(state).length > 0){
            
            //make array of replies empty to aviod duplicate replies
            for (let i = 0; i < state.comments.length; i++) {
                state.comments[i].replies = []; // initialize the children
            }

            TreeComments(state.comments)
        }
        
    },[state])


    const TreeComments = (comments)=>{
            let root = []
            for(let comment of comments){
            if(comment.parent){
                const parentIndex = comments.findIndex((cm)=> cm._id === comment.parent)
                comments[parentIndex].replies.push(comment)
            }else{
                root.push(comment)
            }
            }
            setComments(root)
        }

    return (
        <div className='container'>
            <button onClick={()=>{console.log(state)}}>show</button>
        <div>
            <h1>{state?.post?.title}</h1>
            <p>{state?.post?.content}</p>
        </div>

        <CommentSection comments={comments} postId={state?.post?._id}/>
        </div>
    )
}

export default Post
import React, {useState,useRef,useEffect} from 'react'
import './message.css'
import CommentForm from './CommentForm'
import axios from 'axios'
import {usePostContext} from '../../context/context'

const Message = ({message,postId})=>{
    
    const [isActiveReply,setIsActiveReply] = useState(false)
    const [displayReplies,setDisplayReplies] = useState(false)
    const thumbRef = useRef()
    const {setIsPostChanged} = usePostContext()
    //dumbID
    const userId = "634ec44a777b2c79357b219d"
    //handle Like event
    let thumb = false

    useEffect(()=>{
        console.log('chnages')
        const isExist = message?.likes.find((msg)=>{
            return msg == userId
        })

        if(isExist){
            thumb=true
            thumbRef.current.style.color = "#0878f8"
        }else{
            thumb=false
            thumbRef.current.style.color = ""
        }
    },[])

    const handleThumbUp = async()=>{
        if(!thumb){
            thumb=true
            thumbRef.current.style.color = "#0878f8"
        }else{
            thumb=false
            thumbRef.current.style.color = ""
        }

        try{
            const like =  await axios.put('/api/comments/like',{id:message._id,userId})
            setIsPostChanged(prev=> !prev)
        }catch(err){

        }
    }

    return(
        <div className='comment_Container'>

            <div className="profile_Pic">
                <i className="fa-solid fa-circle-user"></i>
            </div>

            <div className="user_Info">
                <h3 className="username">ashraf</h3>
                <p className="message">{message.message}</p>

                <div className="comment_actions">
                    <i className="fa-solid fa-thumbs-up" onClick={handleThumbUp} ref={thumbRef}></i>
                    <p>{message.likes.length}</p>
                    <i className="fa-solid fa-thumbs-down"></i>

                    {/* reply To a comment */}
                    <div onClick={()=> setIsActiveReply(prev=> !prev)} className='replyBtn'>
                        reply
                    </div>

                    {
                        isActiveReply && 
                        <CommentForm setIsActiveReply={setIsActiveReply} parent={message._id}/>
                    }
                </div>

                {/* list of replies comment */}
                <div>
                    {
                        message.replies.length > 0
                        &&
                        <>
                        <p onClick={()=> setDisplayReplies(prev=> !prev)} className='nestedReply'>
                            {message.replies.length === 1 ? '1 reply' : `${message.replies.length} replies`}
                        </p>

                        {displayReplies
                        && <ListComments comments={message.replies}/>
                        }
                        
                        </>
                    }
                </div>
            </div>
        </div>
    )
}


const ListComments = ({comments,postId}) => {
    return (
        <div>
        {
            comments?.length > 0 
            && comments.map((comment)=>(
                <Message key={comment._id} message={comment} postId={postId}/>
            ))
        }
            

    </div>
    )
}

export default ListComments


export const Listcom =()=>{
    return(
        <div>bunch of lists</div>
    )
}
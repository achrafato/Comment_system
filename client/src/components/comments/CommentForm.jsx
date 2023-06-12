import React, {useState,useRef} from 'react'
import './commentForm.css'
import axios from 'axios'
import {usePostContext} from '../../context/context'
import {Add_Comment} from '../../context/actions'


const CommentForm = ({setIsActiveReply,parent}) => {
  const [input,setInput] = useState('')
  //onFocus
  const [displayButtons,setDisplayButtons] = useState(false)
  //keyUp
  const [isActive,setIsActive] = useState(false)
  const inputRef = useRef()
  const {postId,setIsPostChanged,dispatch,state} = usePostContext()

  const handleFocus = ()=>{
    setDisplayButtons(true)
  }

  const handleKeyUp = ()=>{
    if(inputRef.current.value !==''){
          setIsActive(true)
    }else{
      setIsActive(false)
    }
  }

  const handleCancel = ()=>{
    setDisplayButtons(false)
    inputRef.current.value = ''
    setIsActive(false)
    setIsActiveReply(false)
  }


  const handleComment = async()=>{
    if(isActive){
      console.log(state)
      try{
        const {data} = await axios.post('/api/comments/new',{
          userId:"634ed0b43f9f6548d26137ab",
          message:inputRef.current.value,
          parent,
          postId,
        })
        console.log(data)

        dispatch(Add_Comment(data))
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className='form_Comment'>

      <input type='text'
      placeholder='type your comment'
      ref={inputRef}
      onChange={(e)=> setInput(e.target.value)}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      />

      {
        displayButtons &&
        <>
        <div className="buttons">
          <button disabled={!isActive} onClick={handleComment}>Comment</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        </>
      }


    </div>
  )
}

export default CommentForm
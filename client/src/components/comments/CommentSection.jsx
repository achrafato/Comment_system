import React from 'react'
import CommentForm from './CommentForm'
import ListComments from './ListComments'
import './message.css'

const CommentSection = ({comments}) => {

    return (
        <>
            <CommentForm/>
            <div className='Allcomments'>
            <ListComments comments={comments}/>
            </div>
        </>
    )
}

export default CommentSection
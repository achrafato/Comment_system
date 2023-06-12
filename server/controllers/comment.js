
const Comment = require('../models/Comment')
const mongoose = require('mongoose')

exports.FetchComments = async(req,res)=>{

    try{
        const comments = await Comment.find()
        if(!comments)
        return res.status(300).json({message:"your data is Empty"})

        res.status(200).json(comments)
    }catch(err){
        res.status(500).json(err)
    }
}


exports.NewComment = async(req,res)=>{
    const {userId,message,editable,parent,postId,likes,dislikes} = req.body

    try{
        const newComment = await new Comment({
            message,
            likes,
            dislikes,
            postId,
            userId,
            parent,
            editable
        }).save()

        res.status(200).json(newComment)
    }catch(err){
        res.status(500).json(err)
    }
}

//Update Comment
// exports.UpdatePost = async(req,res)=>{
//     const {id} = req.params
//     try{
//         if(mongoose.Types.ObjectId(id)){
//             return res.status(400).json('invalid id')
//         }
        
//         const comment = await Comment.findByIdAndUpdate(id,{$set:req.body},{new:true})

//         res.status(200).json(post)
//     }catch(err){
//         res.status(500).json(err)
//     }
// }

//(Toggle Like button) of a certain comment

exports.ToggleLike = async(req,res)=>{
    const {id,userId} = req.body
    
    try{
        if(!userId) return res.status(400).json('You have to login')
        const user = mongoose.Types.ObjectId(userId)

        //when user is clicked on Like button we must remove it from Dislike
        const isDislike = await Comment.find({_id:id, dislikes: { "$in" : [user]} })

        if(isDislike.length > 0){
            await Comment.updateOne({_id:id},{$pull:{dislikes:user}})
        }

        const comment = await Comment.find({_id:id, likes: { "$in" : [user]} })
        
        if(comment.length > 0){
            await Comment.updateOne({_id:id},{$pull:{likes:user}})
            res.status(200).json('like is removed')
        }else{
            await Comment.updateOne({_id:id},{$push:{likes:user}})
            res.status(200).json('like is added')
        }

    }catch(err){
        res.status(500).json(err)
    }
}


//(Toggle UnLike button) of a certain comment

exports.UnlikeBtn = async(req,res)=>{
    const {id,userId} = req.body

    try{
        
        if(!userId) return res.status(400).json('You have to login')
        const user = mongoose.Types.ObjectId(userId)

        //when user is clicked on Unlike button we must remove it from Likes
        const IsLike = await Comment.find({_id:id, likes: { "$in" : [user]} })

        if(IsLike.length > 0){
            await Comment.updateOne({_id:id},{$pull:{likes:user}})
        }

        const comment = await Comment.find({_id:id, dislikes: { "$in" : [user]} })
        
        if(comment.length > 0){
            await Comment.updateOne({_id:id},{$pull:{dislikes:user}})
            res.status(200).json('deslike is removed')
        }else{
            await Comment.updateOne({_id:id},{$push:{dislikes:user}})
            res.status(200).json('deslike is added')
        }

    }catch(err){
        res.status(500).json(err)
    }
}
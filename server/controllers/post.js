const Post = require('../models/Post')
const mongoose = require('mongoose')
const Comment = require('../models/Comment')

//populate comments by Post id 
exports.FetchPost = async(req,res)=>{
    const {id} = req.params
    try{
        const post = await Post.findOne({ _id: id}).populate("comments")

        if (post) {//i'm not sure about validity of this line, i need to check it later
            
            return res.status(200).json({post, comments:post.comments});
        }
    }catch(err){
        res.status(500).json(err)
    }
}


// create post
exports.NewPost = async(req,res)=>{
    const {title,content,userId} = req.body
    try{
        const newPost = await Post({
            title,
            content,
            userId
        }).save()
        res.status(200).json(newPost)
    }catch(err){
        res.status(500).json(err)
    }
}



//Update Post
exports.UpdatePost = async(req,res)=>{
    const {id} = req.params
    try{
        if(mongoose.Types.ObjectId(id)){
            return res.status(400).json('invalid id')
        }
        
        const post = await Post.findByIdAndUpdate(id,{$set:req.body},{new:true})

        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
}


//delete post and all referenced comments with post

exports.RemovePost = async(req,res)=>{
    const {id} = req.params

    try{
        const deleted = await Post.findByIdAndDelete(id)
        await Comment.deleteMany({postId:id})
        res.status(200).json('Post Deleted Successfully')
    }catch(err){
        res.status(500).json(err)
    }
}
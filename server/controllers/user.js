const User = require('../models/User')
const mongoose = require('mongoose')
const Comment = require('../models/Comment')
const Post = require('../models/Post')


// create a new User
exports.NewUser = async(req,res)=>{
    const {name,age,email} = req.body

    try{
        const newUser = await new User({
            name,
            age,
            email
        }).save()

        res.status(200).json({newUser})
    }catch(err){
        res.status(200).json(err)
    }
}


// remove user and it own comments and posts
exports.RemoveUser = async(req,res)=>{
    const {id} = req.params
    
    try{
        if(mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"invalid Id"})
        }

        const deleted = await User.findByIdAndDelete(id)
        await Comment.deleteMany({userId:id})
        await Post.deleteMany({userId:id})

        res.status(200).json("user is deleted")
    }catch(err){
        res.status(500).json(err)
    }
}


// fetch user
exports.FetchUser = async(req,res)=>{
    const {id} = req.params

    try{
        if(mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:'Invalid Id'})
        }
    
        const user = await User.findOne({_id:id})
    
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}


// fetch Users
exports.FetchUsers = async(req,res)=>{

    try{

        const users = await User.find()
    
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}
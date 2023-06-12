const mongoose = require('mongoose')

// comment Schema 

const CommentSchema = mongoose.Schema({
    message:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Post"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    replies:[{type:String,default:""}],
    editable:{type:Boolean,default:false}
},{timestamps:true})

const Comment  = mongoose.model('Comment',CommentSchema)
module.exports = Comment


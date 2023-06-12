const mongoose = require('mongoose')

// Post Schema 
const PostSchema = mongoose.Schema({

    title:{type:String,required:true},
    content:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{
toJson: { virtuals: true },
toObject: { virtuals: true }
})

const Post = mongoose.model('Post',PostSchema)
module.exports = Post


PostSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',//of post collection
    foreignField:'postId'//of comment collection
})
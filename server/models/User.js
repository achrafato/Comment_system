const mongoose = require('mongoose')

// User Schema 
const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true}
})

const User = mongoose.model('User',UserSchema)
module.exports = User
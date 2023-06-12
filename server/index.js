const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// routes
const Postroutes = require('./routes/post')
const Commentroutes = require('./routes/comment')
const Userroutes = require('./routes/user')

dotenv.config()
app.use(express.json())



app.use('/api/posts',Postroutes)
app.use('/api/comments',Commentroutes)
app.use('/api/users',Userroutes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log('server started')
})

const url = "mongodb://localhost:27017/CommentSys"
mongoose.connect(url)
.then(()=> console.log('mongoose is connected'))
.catch(()=> console.log('mongoose is failed'))

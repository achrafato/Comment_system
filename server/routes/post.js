const express = require('express')
const router = express.Router()
const {FetchPost,NewPost,UpdatePost} = require('../controllers/post')


router.post('/new',NewPost)


router.get('/:id',FetchPost)


router.put('/:id',UpdatePost)


module.exports = router
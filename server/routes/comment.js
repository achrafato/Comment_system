const express = require('express')
const router = express.Router()
const {FetchComments,NewComment,ToggleLike,UnlikeBtn} = require('../controllers/comment')


router.post('/new',NewComment)
router.get('/',FetchComments)
router.put('/like',ToggleLike)
router.put('/deslike',UnlikeBtn)

module.exports = router
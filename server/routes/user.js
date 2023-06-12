const express = require('express') 
const router = express.Router()
const {NewUser,FetchUsers} = require('../controllers/user')

router.post('/new',NewUser)
router.get('/all',FetchUsers)


module.exports = router
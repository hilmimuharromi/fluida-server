const router = require('express').Router()
const {Register, Login, getUser} = require('../controller/userController')


router.post('/register', Register)
router.post('/login', Login)
router.get('/user', getUser)

module.exports = router
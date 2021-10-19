const router = require('express').Router()
const {create} = require('../controller/materiController')
const authentication = require('../middleware/authentication')
router.post('/materi',authentication, create)

module.exports = router
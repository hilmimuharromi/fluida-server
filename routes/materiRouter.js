const router = require('express').Router()
const {create, getAll, update, deleteMateri} = require('../controller/materiController')
const authentication = require('../middleware/authentication')
const {materiAuthorization}= require('../middleware/authorization')

router.post('/materi',authentication, create)
router.get('/materi', getAll)
router.put('/materi/:id',authentication, materiAuthorization, update)
router.delete('/materi/:id',authentication, materiAuthorization, deleteMateri)
module.exports = router
const router = require('express').Router()
const {create, getAll, update, deletePraktikum} = require('../controller/praktikumController')
const authentication = require('../middleware/authentication')
const {praktikumAuthorization}= require('../middleware/authorization')

router.post('/praktikum',authentication, create)
router.get('/praktikum', getAll)
router.put('/praktikum/:id',authentication, praktikumAuthorization, update)
router.delete('/praktikum/:id',authentication, praktikumAuthorization, deletePraktikum)
module.exports = router
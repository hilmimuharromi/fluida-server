const router = require('express').Router()
const {create, getAll, update, deleteSoalLatihan} = require('../controller/soalLatihanController')
const authentication = require('../middleware/authentication')
const {soalLatihanAuthorization}= require('../middleware/authorization')

router.post('/soal-latihan',authentication, create)
router.get('/soal-latihan', getAll)
router.put('/soal-latihan/:id',authentication, soalLatihanAuthorization, update)
router.delete('/soal-latihan/:id',authentication, soalLatihanAuthorization, deleteSoalLatihan)
module.exports = router
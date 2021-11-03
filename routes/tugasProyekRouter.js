const router = require('express').Router()
const {create, getAll, update, deleteTugasProyek} = require('../controller/tugasProyekController')
const authentication = require('../middleware/authentication')
const {tugasProyekAuthorization}= require('../middleware/authorization')

router.post('/tugas-proyek',authentication, create)
router.get('/tugas-proyek', getAll)
router.put('/tugas-proyek/:id',authentication, tugasProyekAuthorization, update)
router.delete('/tugas-proyek/:id',authentication, tugasProyekAuthorization, deleteTugasProyek)
module.exports = router
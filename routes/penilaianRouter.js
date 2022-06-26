const router = require('express').Router()
const {addPenilaianPraktikum, getPenPraktikum} = require('../controller/penPraktikumController')
const multer = require('../middleware/upload')
const authentication = require('../middleware/authentication')

router.post("/praktikum",authentication, multer("pdf", "praktikum"),addPenilaianPraktikum)
router.get("/praktikum",authentication, getPenPraktikum)
module.exports = router

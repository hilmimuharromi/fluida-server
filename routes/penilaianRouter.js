const router = require('express').Router()
const {addPenilaianPraktikum, getPenPraktikum} = require('../controller/penPraktikumController')
const {addPenilaianSoal, getPenSoal}  = require('../controller/penSoalLatihan')
const multer = require('../middleware/upload')
const authentication = require('../middleware/authentication')

router.post("/praktikum",authentication, multer("pdf", "praktikum"),addPenilaianPraktikum)
router.get("/praktikum",authentication, getPenPraktikum)
router.post("/soal", authentication, addPenilaianSoal)
router.get("/soal", authentication, getPenSoal)
module.exports = router

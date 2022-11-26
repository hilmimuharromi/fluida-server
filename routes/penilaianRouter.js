const router = require('express').Router()
const {addPenilaianPraktikum, getPenilaianPraktikum, submitScorePraktikum, deletePenPraktikum} = require('../controller/penPraktikumController')
const {addPenilaianSoal, getPenSoal, deletePenSoal, submitScore}  = require('../controller/penSoalLatihan')
const {addPenProyek, getPenProyek} = require('../controller/penProyekController')
const multer = require('../middleware/upload')
const authentication = require('../middleware/authentication')

// router.post("/praktikum",authentication, multer("pdf", "praktikum"),addPenilaianPraktikum)
// router.get("/praktikum",authentication, getPenPraktikum)

router.post('/proyek/:proyekId', authentication,multer("answer", "proyek"), addPenProyek)
router.get('/proyek/:proyekId', authentication, getPenProyek)

router.post('/praktikum', authentication, addPenilaianPraktikum)
router.get('/praktikum/:praktikumId', authentication, getPenilaianPraktikum)
router.put('/score/praktikum/:id', authentication, submitScorePraktikum)
router.delete("/praktikum/:id", authentication, deletePenPraktikum)

router.post("/soal", authentication, addPenilaianSoal)
router.get("/soal/:soalId", authentication, getPenSoal)
router.put('/score/soal/:id', authentication, submitScore)
router.delete("/soal/:id", authentication, deletePenSoal)
module.exports = router

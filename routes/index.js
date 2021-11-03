const router = require('express').Router()
const multer = require('../middleware/upload')
const path = require("path");
const fs = require('fs');
const fsPromises = fs.promises;
const userRouter = require('./userRouter')
const materiRouter = require('./materiRouter')
const praktikumRouter = require('./praktikumRouter')
const tugasProyekRouter = require('./tugasProyekRouter')
const soalLatihanRouter = require('./soalLatihanRouter')
const playlistRouter = require('./playlistRouter')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'server is running '
    })
})

router.use(userRouter)
router.use(materiRouter)
router.use(praktikumRouter)
router.use(tugasProyekRouter)
router.use(soalLatihanRouter)
router.use(playlistRouter)
router.post('/upload',multer, async (req, res) => {

    console.log('masuuuk / upload', req.file)

    try{
        res.status(201).json({
            data: {
                url: req.file.filename
            }
        })
    } catch (err) {
       res.status(400).json({
           err
       })
    }

})

router.get('/pdf/:url', (req, res) => {
    const {url} = req.params
    const document = path.join(__dirname, `../upload/${url}`)
    fs.readFile(document, (err, data) => {
        if(err) {
            res.status(400).json({
                message: 'document not found'
            })
        }
        console.log('data =============>', data)
    })
    if(document) {
        res.status(200).sendFile(document);
    } else {
        res.status(400).json({
            message: 'document not found'
        })
    }
})

module.exports = router
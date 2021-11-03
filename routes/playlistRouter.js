const router = require('express').Router()
const {create, getAll, deletePlaylist, update} = require('../controller/playlistController')
const authentication = require('../middleware/authentication')

router.post('/playlist',authentication, create)
router.get('/playlist',  getAll)
router.delete('/playlist/:id', authentication, deletePlaylist)
router.put('/playlist/:id', authentication, update)

module.exports = router
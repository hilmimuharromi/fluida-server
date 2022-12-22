const Playlist = require('../models/playlist')


const create  = async (req, res, next) => {
  const userId = req.decoded.id;
    try {
        console.log(req.body)
        const {title,coverImage, contents} = req.body
        const result = await Playlist.create({
            title,coverImage, contents, user: userId
        })
        console.log('result playlist', result)
        res.status(201).json({
            status: true,
            message: 'success',
            data: result
        })
    } catch(e) {
        console.log('error', JSON.stringify(e))
        res.status(400).json({
            status: false,
            message: 'Gagal'
        })
    }

}

const getAll = async (req, res) => {

    try{
        const result = await Playlist.find({}).populate('contents.materi').populate('contents.soalLatihan').populate('contents.tugasProyek').populate('contents.praktikum').populate('user')
        res.status(200).json({
            status: true,
            message: 'success',
            data: result
        })

    } catch(e) {
        console.log('error', e)
        res.status(400).json({
            status: false,
            message: 'Gagal',
            error: JSON.stringify(e)
        })
    }

}

const deletePlaylist = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await Playlist.deleteOne({_id})
        res.status(200).json({
            status: true,
            data: result,
          });

    }catch(e) {
        res.status(400).json({
            status: false,
            error: e.message,
          });

    }
}

const update = async (req, res) => {
    const {title, contents} = req.body
    const _id = req.params.id
    try {
        const result = await Playlist.updateOne({_id}, {title, contents})
        res.status(200).json({
            status: true,
            data: result,
          });

    }catch(e) {
        res.status(400).json({
            status: false,
            error: e.message,
          });

    }
}

module.exports = {create, getAll, deletePlaylist, update}
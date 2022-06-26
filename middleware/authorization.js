const Materi = require ('../models/materi')
const Praktikum = require ('../models/praktikum')
const TugasProyek = require('../models/tugasProyek')
const SoalLatihan = require('../models/soalLatihan')
const materiAuthorization = async(req, res, next) => {
    try {
        const user = req.decoded
        const _id = req.params.id

        if(user.role === 'admin') next()
        else if(user.role === 'murid') throw new Error('not authorized')
        else {
            const result = await Materi.findOne({_id}).populate('user')
            if(result.user.id === user.id) {
                next()
            } else {
                throw new Error('not authorized')
            }
        }
    } catch(e) {
        res.status(403).json({
            status: false,
            error: JSON.stringify(e.message)
        })
    }

}

const praktikumAuthorization = async(req, res, next) => {
    try {
        const user = req.decoded
        const _id = req.params.id

        if(user.role === 'admin') next()
        else if(user.role === 'murid') throw new Error('not authorized')
        else {
            const result = await Praktikum.findOne({_id}).populate('user')
            if(result.user.id === user.id) {
                next()
            } else {
                throw new Error('not authorized')
            }
        }
    } catch(e) {
        res.status(403).json({
            status: false,
            error: JSON.stringify(e.message)
        })
    }

}

const tugasProyekAuthorization = async(req, res, next) => {
    try {
        const user = req.decoded
        const _id = req.params.id

        if(user.role === 'admin') next()
        else if(user.role === 'murid') throw new Error('not authorized')
        else {
            const result = await TugasProyek.findOne({_id}).populate('user')
            if(result.user.id === user.id) {
                next()
            } else {
                throw new Error('not authorized')
            }
        }
    } catch(e) {
        res.status(403).json({
            status: false,
            error: JSON.stringify(e.message)
        })
    }
}

const soalLatihanAuthorization = async(req, res, next) => {
    try {
        const user = req.decoded
        const _id = req.params.id

        if(user.role === 'admin') next()
        else if(user.role === 'murid') throw new Error('not authorized')
        else {
            const result = await SoalLatihan.findOne({_id}).populate('user')
            if(result.user.id === user.id) {
                next()
            } else {
                throw new Error('not authorized')
            }
        }
    } catch(e) {
        res.status(403).json({
            status: false,
            error: JSON.stringify(e.message)
        })
    }
}


module.exports = {
    materiAuthorization,
    praktikumAuthorization,
    tugasProyekAuthorization,
    soalLatihanAuthorization
}
const User = require('../models/user')
const {verifyToken} = require('../helper/token')

const authentication = async (req, res, next) => {
   try{
       const token = req.headers.token
       if(!token) {
            throw new Error('authentication')
       }
       req.decoded = verifyToken(token)
       const verifyUser = await User.findOne({
        _id: req.decoded.id
        })
       if(verifyUser) {
           req.decoded = verifyUser
        return next()
    }
       else {
        return res.status(403).json({
            message: 'Please Login first'
        })
       }
   } catch (err) {
    console.log('error syhenticate', err)

    res.status(403).json({
        message: 'Please login'
    })
       

   }

}

module.exports = authentication
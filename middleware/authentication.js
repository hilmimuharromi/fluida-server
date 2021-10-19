const User = require('../models/user')
const {verifyToken} = require('../helper/token')

const authentication = async (req, res, next) => {
   try{
       const token = req.headers.token
       
       if(!token) {
           return  next({
            name: 'authentication',
            status: 403,
            message: 'Forbidden'
        })
       }
       req.decoded = verifyToken(token)
       const verifyUser = await User.findOne({
           where: {
               email: req.decoded.email
           }
       })
       if(verifyUser) {
        return next()
    }
       else {
        return res.status(403).json({
            message: 'Please Login first'
        })
       }
   } catch (err) {
    console.log('error syhenticate', err)

    next(err)
       

   }

}

module.exports = authentication
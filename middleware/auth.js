
const jwt = require("jsonwebtoken")

require('dotenv').config()


const auth = (req,res,next)=>{


    const token  = req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,process.env.pass)

        if(decoded){
            if(!req.body.Userid){
                req.body.Userid = decoded.Userid
            }
            next()
        }
    }
}

module.exports = {auth}
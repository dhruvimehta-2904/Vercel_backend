const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")


 const authMiddleware = async(req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        res.status(400).json({message:"token not provided"})
    }

    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = await User.findById(_id).select("_id")
        next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

module.exports = authMiddleware
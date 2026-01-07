const User = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const upload = require("../Middleware/upload")

const createToken = require("../Middleware/generateToken")

module.exports.signup = async(req,res)=>{
    try {
        const {name, email, password, pic} = req.body

        if(!name || !email || !password){
            res.status(400)
            throw new Error("not provided name email password")
        }

        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error("already exist")
        }
        const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password, salt)

if (!req.file) {
  return res.status(400).json({
    message: "Image is required"
  })
}
            const user = new User({
                name, email, password:hashPassword,
                 pic: req.file ? req.file.path:null
            //    pic: `/uploads/${req.file.filename}`
            })
console.log(req.file)

       const data =  await user.save()
       const token = await createToken(user._id)
       res.status(201).json({message:"user registered", data})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports.login = async(req,res)=>{
    try {
        const {email, password}= req.body

        if(!email || !password){
            res.status(400)
            throw new Error("email and password required")
        }

        const user = await User.findOne({email})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({message:"passwrd not match"})
        }
     const token =await  createToken(user._id)
        res.json({message:"login sucessfully",
            user:{
                token,
            email: user.email
            }
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports.search = async(req,res)=>{
    try {
        const {name} = req.query
            const user = await User.find({
      name: { $regex: name, $options: "i" } // exclude logged-in user (optional)
    }).select("-password");

 res.status(200).json({message:"user display", 
                user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}




module.exports.getAll = async(req,res)=>{
    try {
       const user = await User.find({_id:{$ne:req.user._id}}).select("-password")
       res.status(200).json({message:"all data", user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
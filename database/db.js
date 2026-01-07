const mongoose =require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connect")
})
.catch((err)=>{
    console.log(err.message);
    
})

// const db = async()=>{
//    try {
//     await mongoose.connect(process.env.MONGO_URL)
//     console.log("connected to server".red);
//    } catch (error) {
//     console.log(error.message.red)
//     process.exit(1)
//    }
    
// }
// module.exports = db
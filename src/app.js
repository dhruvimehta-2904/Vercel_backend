const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const colors = require("colors")
const cors = require("cors")
const db = require("../database/db")
const {notFound, errorHandler} = require("../Middleware/errorHandling")
const {chats} = require("../data/chats")
const port = process.env.PORT || 3000

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/uploads", express.static("uploads"))


const userroutes = require("../routes/userRoutes")
app.use("/", userroutes)




app.get("/", (req,res)=>{
    console.log("hello");
    res.send("hello")
})


app.get("/api/chat", (req,res)=>{
res.send(chats)
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
console.log(`http://localhost:3000`.bgMagenta);

})
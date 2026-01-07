const express = require("express")
const router = express.Router()
const authMiddleware = require("../Middleware/authMiddleware")

const chatController = require("../controllers/chatController")
router.post("/", authMiddleware, chatController.accessChat)


module.exports = router
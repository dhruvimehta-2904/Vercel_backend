const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")
const authMiddleware = require("../Middleware/authMiddleware")
const upload = require("../Middleware/upload")

router.post("/signup", upload.single("pic") ,authController.signup )
router.post("/login", authController.login)
router.get("/search", authMiddleware, authController.search)
router.get("/all", authMiddleware, authController.getAll)

module.exports = router
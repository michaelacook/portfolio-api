const express = require("express")
const router = express.Router()

const UserService = require("../services/UserService")
const authorize = require("../middleware/authorization")()

router.get("/", authorize, async (req, res, next) => {
  try {
    const email = req.user.email
    const user = await UserService.getUser(email)
    return res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router

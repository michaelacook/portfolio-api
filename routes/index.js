const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({
    message:
      "Welcome to Michael's Portfolio! This site is currently under contruction.",
  })
})

module.exports = router

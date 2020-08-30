const express = require("express")
const router = express.Router()

const PostController = require("../controllers/PostController")
const authorize = require("../middleware/authorization")()

router.get("/posts", (req, res, next) => {
  PostController.postsGET(req, res, next)
})

router.get("/posts/:id", (req, res, next) => {
  PostController.postGET(req, res, next)
})

// private route
router.post("/posts/add", authorize, (req, res, next) => {
  PostController.postPOST(req, res, next)
})

// private route
router.put("/posts/:id/update", authorize, (req, res, next) => {
  PostController.postPUT(req, res, next)
})

// private route
router.delete("/posts/:id/delete", authorize, (req, res, next) => {
  PostController.postDELETE(req, res, next)
})

module.exports = router

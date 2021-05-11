const express = require("express")
const router = express.Router()

const postService = require("../services/PostService")
const authorizationMiddleware = require("../middleware/authorization")()
const postExistsMiddleware = require("../middleware/postExists")()

router.get("/", async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts()
    return res.json(posts)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", postExistsMiddleware, (req, res, next) => {
  try {
    const { post } = req
    return res.json(post)
  } catch (error) {
    next(error)
  }
})

// private route
router.post("/add", authorizationMiddleware, async (req, res, next) => {
  try {
    const id = await postService.createPost(req.body)
    return res.status(201).json(id)
  } catch (error) {
    next(error)
  }
})

// private route
router.put(
  "/:id/update",
  authorizationMiddleware,
  postExistsMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.id
      await postService.updatePost(id, req)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

// private route
router.delete(
  "/:id/delete",
  authorizationMiddleware,
  postExistsMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.id
      await postService.deletePost(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

router.get("/search/:keyword", async (req, res, next) => {
  try {
    const keyword = req.params.keyword
    const posts = await postService.searchPost(keyword)
    return res.json(posts)
  } catch (error) {
    next(error)
  }
})

module.exports = router

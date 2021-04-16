const express = require("express")
const router = express.Router()

const PostService = require("../services/PostService")
const authorize = require("../middleware/authorization")()

router.get("/posts", async (req, res, next) => {
  try {
    const posts = await PostService.getAllPosts()
    return res.json(posts)
  } catch (error) {
    next(error)
  }
})

router.get("/posts/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const post = await PostService.getPost(id)
    return res.json(post)
  } catch (error) {
    next(error)
  }
})

// private route
router.post("/posts/add", authorize, async (req, res, next) => {
  try {
    const id = await PostService.createPost(req.body)
    return res.status(201).json(id)
  } catch (error) {
    next(error)
  }
})

// private route
router.put("/posts/:id/update", authorize, async (req, res, next) => {
  try {
    const id = req.params.id
    await PostService.updatePost(id, req)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// private route
router.delete("/posts/:id/delete", authorize, async (req, res, next) => {
  try {
    const id = req.params.id
    await PostService.deletePost(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.get("/posts/search/:keyword", async (req, res, next) => {
  try {
    const keyword = req.params.keyword
    const posts = await PostService.searchPost(keyword)
    return res.json(posts)
  } catch (error) {
    next(error)
  }
})

module.exports = router
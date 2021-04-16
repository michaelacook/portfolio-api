const express = require("express")
const router = express.Router()

const UserService = require("../services/UserService")
const PostService = require("../services/PostService")
const ProjectService = require("../services/ProjectService")
const authorize = require("../middleware/authorization")()

// User routes------------------------------------------------//

// private
router.get("/user", authorize, async (req, res, next) => {
  try {
    const email = req.user.email
    const user = await UserService.getUser(email)
    return res.json(user)
  } catch (error) {
    next(error)
  }
})

// Post routes------------------------------------------------//

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

// Project routes---------------------------------------------//
router.get("/projects", async (req, res, next) => {
  try {
    const projects = await ProjectService.getProjects()
    return res.json(projects)
  } catch (error) {
    next(error)
  }
})

router.get("/projects/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const project = await ProjectService.getProject(id)
    return res.json(project)
  } catch (error) {
    next(error)
  }
})

router.post("/projects/add", authorize, async (req, res, next) => {
  try {
    await ProjectService.addProject(req)
    return res.status(201).end()
  } catch (error) {
    next(error)
  }
})

router.put("/projects/:id/update", authorize, async (req, res, next) => {
  try {
    const id = req.params.id
    await ProjectService.updateProject(id, req.body)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.delete("/projects/:id/delete", authorize, async (req, res, next) => {
  try {
    const id = req.params.id
    await ProjectService.deleteProject(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// User routes------------------------------------------------//

module.exports = router

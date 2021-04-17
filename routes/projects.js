const express = require("express")
const router = express.Router()

const ProjectService = require("../services/ProjectService")
const authorize = require("../middleware/authorization")()

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
    return project ? res.json(project) : res.status(404).end()
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

module.exports = router

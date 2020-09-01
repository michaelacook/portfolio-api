const express = require("express")
const router = express.Router()

const PostController = require("../controllers/PostController")
const ProjectController = require("../controllers/ProjectController")
const authorize = require("../middleware/authorization")()

// Post routes------------------------------------------------//

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

// Project routes---------------------------------------------//
router.get("/projects", (req, res, next) => {
  ProjectController.projectsGET(req, res, next)
})

router.get("/projects/:id", (req, res, next) => {
  ProjectController.projectGET(req, res, next)
})

router.post("/projects/add", authorize, (req, res, next) => {
  ProjectController.projectPOST(req, res, next)
})

router.put("/projects/:id/update", authorize, (req, res, next) => {
  ProjectController.projectPUT(req, res, next)
})

router.delete("/projects/:id/delete", authorize, (req, res, next) => {
  ProjectController.projectDELETE(req, res, next)
})

// User routes------------------------------------------------//



module.exports = router

const express = require("express")
const router = express.Router()

const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  } 
})

const upload = multer({ storage }).single("img")

const UserController = require("../controllers/UserController")
const PostController = require("../controllers/PostController")
const ProjectController = require("../controllers/ProjectController")
const authorize = require("../middleware/authorization")()

// User routes------------------------------------------------//

// private
router.get("/user", authorize, (req, res, next) => {
  UserController.userGET(req, res, next)
})

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

router.get("/posts/search/:keyword", (req, res, next) => {
  PostController.postSEARCH(req, res, next)
}) 

// Project routes---------------------------------------------//
router.get("/projects", (req, res, next) => {
  ProjectController.projectsGET(req, res, next)
})

router.get("/projects/:id", (req, res, next) => {
  ProjectController.projectGET(req, res, next)
})

router.post("/projects/add", authorize, (req, res, next) => {
  console.log(req.body)
  ProjectController.projectPOST(req, res, next)
})

// handle file upload
// make this a protected route
router.post("/projects/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err)
      return res.status(500).end()
    }
    res.status(204).end()
  })
})

router.put("/projects/:id/update", authorize, (req, res, next) => {
  ProjectController.projectPUT(req, res, next)
})

router.delete("/projects/:id/delete", authorize, (req, res, next) => {
  ProjectController.projectDELETE(req, res, next)
})

// User routes------------------------------------------------//



module.exports = router

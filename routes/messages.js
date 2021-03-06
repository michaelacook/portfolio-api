const express = require("express")
const router = express.Router()

const authorizationMiddleware = require("../middleware/authorization")()
const messageService = require("../services/MessageService")
const SocketService = require("../server/socket")
const { server } = require("../server/http")
const io = new SocketService(server)

router.get("/", authorizationMiddleware, async (req, res, next) => {
  try {
    const messages = await messageService.getMessages()
    return res.status(200).json(messages)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get("/archive", authorizationMiddleware, async (req, res, next) => {
  try {
    const archivedMessages = await messageService.getMessages(true)
    return res.status(200).json(archivedMessages)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", authorizationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await messageService.getMessage(id)
    return res.status(200).json(message)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    if (!req.body || !(req.body.from && req.body.subject && req.body.content)) {
      return res.status(400).end()
    }
    const { body } = req
    const message = await messageService.createMessage(body)
    io.emit("message", message)
    return res.status(201).json(message)
  } catch (err) {
    next(err)
  }
})

router.put("/archive/:id", authorizationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await messageService.archive(id)
    res.status(200).json(message)
  } catch (err) {
    next(err)
  }
})

router.put(
  "/mark-read/:id",
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const message = await messageService.markAsRead(id)
      return res.status(200).json(message)
    } catch (err) {
      next(err)
    }
  }
)

router.delete("/:id", authorizationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    await messageService.delete(id)
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router

const auth = require("basic-auth")
const express = require("express")
const router = express.Router()

const authorizationMiddleware = require("../middleware/authorization")()
const messageService = require("../services/MessageService")

router.get("/", authorizationMiddleware, async (req, res, next) => {
  try {
    const archived = req.query.archived
    const messages = await messageService.getMessages(
      archived ? true : undefined
    )
    res.status(200).json(messages)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", authorizationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await messageService.getMessage(id)
    res.status(200).json(message)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    if (!req.body || !(req.body.from && req.body.subject && req.body.content)) {
      res.status(400).end()
    }
    const message = await messageService.createMessage(body)
    return res.status(201).json(message)
  } catch (err) {
    next(err)
  }
})

router.put("/archive/:id", authorizationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await messageService.archive(id)
    return res.status(200).json(message)
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

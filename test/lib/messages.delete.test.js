const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

const messageService = require("../../services/MessageService")

module.exports = () => {
  describe("messages DELETE", () => {
    describe("/messages/:id", async () => {
      const messages = await messageService.getMessages()
      const { id } = messages[messages.length - 1]

      it("returns 204 No Content on the happy path", () => {
        return request(app)
          .delete(`/messages/${id}`)
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect(204)
      })

      it("returns a 401 Unauthorized when auth credentials not sent", () => {
        return request(app).delete(`/messages/${id}`).expect(401)
      })
    })
  })
}

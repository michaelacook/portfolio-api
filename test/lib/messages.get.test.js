const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("messages GET", () => {
    describe("/messages", () => {
      it("returns 200 OK and an array of messages", () => {
        return request(app)
          .get("/messages")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isArray(response.body)
          })
      })

      it("returns 401 Unauthorized when no auth credentials sent", () => {
        return request(app).get("/messages").expect(401)
      })
    })

    describe("/messages/:id", () => {
      it("returns 200 and a message object", () => {
        return request(app)
          .get("/messages/1")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isObject(response.body)
            assert.hasAllDeepKeys(response.body, [
              "id",
              "from",
              "subject",
              "content",
              "archived",
              "read",
              "createdAt",
              "updatedAt",
            ])
          })
      })

      it("returns 401 Unauthorized when no auth credentials sent", () => {
        return request(app).get("/messages/1").expect(401)
      })
    })
  })
}

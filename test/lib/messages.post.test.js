const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("messages POST", () => {
    describe("/messages POST", () => {
      it("returns 201 Created and a message object on the happy path", () => {
        return request(app)
          .post("/messages")
          .send({
            from: "email@email.com",
            subject: "test",
            content: "This is a test message",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
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

      it("returns 400 Bad Request when required data not sent", () => {
        return request(app)
          .post("/messages")
          .send({
            subject: "test",
            content: "This is a test message",
          })
          .expect(400)
      })
    })
  })
}

const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("messages PUT", () => {
    describe("/archive/:id PUT", () => {
      it("returns 200 OK and an archived message on the happy path", () => {
        return request(app)
          .put("/messages/archive/2")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.equal(response.body.archived, true)
          })
      })

      it("returns 401 Unauthorized when not auth credentials sent", () => {
        return request(app).put("/messages/archive/2").expect(401)
      })
    })

    describe("/messages/mark-read/:id PUT", () => {
      it("returns 200 OK and a message marked as read on the happy path", () => {
        return request(app)
          .put("/messages/mark-read/2")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.equal(response.body.read, true)
          })
      })

      it("returns 401 Unauthorized when auth credentials not sent", () => {
        return request(app).put("/messages/mark-read/2").expect(401)
      })
    })
  })
}

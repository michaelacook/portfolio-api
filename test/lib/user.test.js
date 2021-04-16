const request = require("supertest")
const app = require("../../app")

module.exports = () => {
  describe("GET /user", (done) => {
    it("responds with 401 Unauthorized when no Basic Auth header sent", () => {
      request(app).get("/user").expect(401, done)
    })
  })
}

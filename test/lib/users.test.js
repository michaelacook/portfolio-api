const request = require("supertest")
const app = require("../../app")

module.exports = () => {
  describe("users GET", (done) => {
    it("responds with 401 Unauthorized when no Basic Auth header sent", () => {
      request(app).get("/user").expect(401, done)
    })

    it("responds with 200 and JSON when Basic Auth header sent", () => {
      request(app)
        .get("/user")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          return done()
        })
    })
  })
}

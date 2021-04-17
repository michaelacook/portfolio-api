const request = require("supertest")
const app = require("../../app")

module.exports = () => {
  describe("projects PUT", () => {
    describe("/projects/:id/update", () => {
      it("returns 401 Unauthorized when Basic Auth header not sent", (done) => {
        request(app)
          .put("/projects/77/update")
          .send({
            description: "updated",
          })
          .set("Accept", "application/json")
          .expect(401, done)
      })

      it("updates a project in the database and returns 204 No Content when Basic Auth header sent", (done) => {
        request(app)
          .put("/projects/77/update")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send({
            description: "updated",
          })
          .set("Accept", "application/json")
          .expect(204, done)
      })
    })
  })
}

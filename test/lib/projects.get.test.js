const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("projects GET", () => {
    describe("/projects", () => {
      it("returns a 200 OK and an array of projects", (done) => {
        request(app)
          .get("/projects")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isArray(response.body)
            done()
          })
          .catch((err) => done(err))
      })
    })

    describe("/projects/:id", () => {
      it("returns a 200 OK and a single project object", () => {
        request(app)
          // somehow I had up to 76 test projects. This could obviously change with some seeds added
          .get("/projects/76")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isObject(response.body)
            assert.property(response.body, "title")
            assert.property(response.body, "description")
            assert.property(response.body, "img_url")
            assert.property(response.body, "repo_url")
            assert.property(response.body, "technologies")
            assert.property(response.body, "live_link")
          })
          .catch((err) => done(err))
      })

      it("returns a 404 Not Found when passed a non-existent id", (done) => {
        request(app).get("/projects/1000").expect(404, done)
      })
    })
  })
}

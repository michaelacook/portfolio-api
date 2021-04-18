const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

const PostService = require("../../services/PostService")

const updatedPost = {
  title: "Updated",
}

module.exports = () => {
  describe("posts PUT", () => {
    describe("/posts/:id/update", () => {
      it("returns 500 Server Error when send a PUT request with a bad post id", async () => {
        const posts = await PostService.getAllPosts()
        const { id } = posts[posts.length - 1]
        const badId = id + 1

        request(app)
          .put(`/posts/${badId}/update`)
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send(updatedPost)
          .expect(500)
          .then((response) => {
            done()
          })
      })

      it("returns a 401 Unauthorized when PUT request sent without Basic Auth header", async () => {
        const posts = await PostService.getAllPosts()
        const { id } = posts[posts.length - 1]

        request(app)
          .put(`/posts/${id}/update`)
          .send(updatedPost)
          .expect(401)
          .then((response) => {
            done()
          })
      })

      it("returns 204 No Content when sent PUT request with Basic Auth header", async () => {
        const posts = await PostService.getAllPosts()
        const { id } = posts[posts.length - 1]

        request(app)
          .put(`/posts/${id}/update`)
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send(updatedPost)
          .expect(204)
          .then((response) => {
            done()
          })
      })
    })
  })
}

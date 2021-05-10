const PostService = require("../services/PostService")

module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const post = await PostService.getPost(id)
    if (!post) {
      return res.status(404).end()
    }
    // on a simple GET request the controller can pass along
    // the project instead of making another database query
    req.post = post
    return next()
  }
}

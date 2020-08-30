const PostService = require("../services/PostService")

module.exports = class PostController {
  /**
   * Handle control for /posts/:id route GET
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next in middleware chain
   * @return {Object} response with post JSON
   */
  static async postGET(req, res, next) {
    try {
      const id = req.params.id
      const post = await PostService.getPost(id)
      return res.json(post)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /posts route GET
   * @param {Object} req - request
   * @param {Object} res - response
   * @param {Function} next - next middleware
   */
  static async postsGET(req, res, next) {
    try {
      const posts = await PostService.getAllPosts()
      return res.json(posts)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /posts/add POST
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async postPOST(req, res, next) {
    try {
      const id = await PostService.createPost(req.body)
      return res.status(201).json(id)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /posts/:id/update PUT
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async postPUT(req, res, next) {
    try {
      const id = req.params.id
      await PostService.updatePost(id, req)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /posts/:id/delete
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async postDELETE(req, res, next) {
    try {
      const id = req.params.id
      await PostService.deletePost(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}

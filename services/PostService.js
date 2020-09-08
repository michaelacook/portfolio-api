const { Post } = require("../models/index")

module.exports = class PostService {
  /**
   * Add a new post
   * @param {Object} destructured from payload
   * @return {Number} post id on success
   * @return {Boolean} false on fail
   */
  static async createPost({ title, body, tags }) {
    try {
      let id
      await Post.sync()
      await Post.create({
        title,
        body,
        tags,
      }).then((post) => (id = post.id))
      return id
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Get all posts
   * @return {Array} posts on success
   * @return {Boolean} false on fail
   */
  static async getAllPosts() {
    try {
      await Post.sync()
      const posts = await Post.findAll()
      if (posts) {
        return posts
      }
      return []
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Get a specific post
   * @param {Number} id - PK for post
   * @return {Object} post on success
   * @return {Boolean} false on fail
   */
  static async getPost(id) {
    try {
      await Post.sync()
      const post = await Post.findByPk(id)
      return post
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Update a post
   * @param {Number} id - post PK
   * @param {Object} payload - table cols to update
   */
  static async updatePost(id, payload) {
    try {
      await Post.sync()
      const post = await Post.findByPk(id)
      for (let name in payload) {
        post[name] = payload[name]
        await post.save()
      }
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Delete a post
   * @param {Number} id - post PK
   * @return {Promise} true on success, false on fail
   */
  static async deletePost(id) {
    try {
      await Post.sync()
      const post = Post.findByPk(id)
      await post.destroy()
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

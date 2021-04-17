const { Post } = require("../models/index")
const { Op } = require("sequelize")

module.exports = {
  /**
   * Add a new post
   * @param {Object} destructured from payload
   * @return {Number} post id on success
   * @return {Boolean} false on fail
   */
  async createPost({ title, body, tags }) {
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
  },

  /**
   * Get all posts
   * @return {Array} posts on success
   * @return {Boolean} false on fail
   */
  async getAllPosts() {
    try {
      await Post.sync()
      const posts = await Post.findAll({
        order: [["id", "DESC"]],
      })
      if (posts) {
        return posts
      }
      return []
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   * Get a specific post
   * @param {Number} id - PK for post
   * @return {Object} post on success
   * @return {Boolean} false on fail
   */
  async getPost(id) {
    try {
      await Post.sync()
      const post = await Post.findByPk(id)
      return post
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   * Update a post
   * @param {Number} id - post PK
   * @param {Object} payload - table cols to update
   */
  async updatePost(id, payload) {
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
  },

  /**
   * Delete a post
   * @param {Number} id - post PK
   * @return {Promise} true on success, false on fail
   */
  async deletePost(id) {
    try {
      await Post.sync()
      await Post.destroy({
        where: {
          id,
        },
      })
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   * Search for posts
   * @param {String} keyword
   * @return {Promise} searchResults or false
   */
  async searchPost(keyword) {
    try {
      await Post.sync()
      const searchResults = await Post.findAll({
        where: {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
      })
      return searchResults
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  },
}

const { Message } = require("../models/index")

module.exports = {
  /**
   * Add a new message to the database
   * @param {Object} destructured
   * @returns {Object} created message
   */
  async createMessage({ from, subject, content }) {
    try {
      await Message.sync()
      const message = await Message.create({
        from,
        subject,
        content,
        read: false,
        archived: false,
      })
      return message
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Update a message as read in the database
   * @param {Number} id - message PK
   * @returns {Object} updated message
   */
  async markAsRead(id) {
    try {
      await Message.sync()
      const message = await Message.findByPk(id)
      message.read = true
      await message.save()
      await message.reload()
      return message
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Get all messages. By default gets non-archived messages
   * @param {Boolean} archived - optionally retrieve archived messages
   * @returns {Object} messages
   */
  async getMessages(archived = false) {
    try {
      await Message.sync()
      const messages = await Messages.findAndCountAll({
        where: {
          archived,
        },
      })
      return messages
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Retrieve a message from the database
   * @param {Number} id - message PK
   * @returns {Object} message
   */
  async getMessage(id) {
    try {
      await Message.sync()
      const message = await Message.findByPk(id)
      return message
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Update a message as archived in the database
   * @param {Number} id - message PK
   * @returns {Object} archived message
   */
  async archive(id) {
    try {
      await Message.sync()
      const message = await Message.findByPk(id)
      message.archived = true
      await message.save()
      await message.reload()
      return message
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Hard delete a message in the database
   * @param {Number} id - message PK
   * @returns {Number} id of deleted message
   */
  async delete(id) {
    try {
      await Message.sync()
      const message = await Message.findByPk(id)
      await message.destroy()
      return message.id
    } catch (err) {
      return Promise.reject(err)
    }
  },
}

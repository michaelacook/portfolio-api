// configure an io instance and create some helper methods

const { Server } = require("socket.io")

const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://michaelacook.ca"

// decouple connection event from emit events
class SocketService {
  constructor(server) {
    this.socket = null
    this.io = new Server(server, {
      cors: {
        origin,
        methods: ["GET", "POST"],
        credentials: true,
      },
    })
    this.listenForConnection()
  }

  /**
   * Listen for a socket connection and set the io property to the returned socket
   */
  listenForConnection() {
    this.io.on("connection", (socket) => {
      console.log("New connection")
      this.socket = socket
    })
  }

  /**
   * Emit an event to the client
   * @param {String} event - event name to emit to the client
   * @param {any} body - data to be sent
   */
  emit(event, body) {
    if (this.socket !== null) {
      if (body === null || body === undefined) {
        throw new Error("Requires a body argument")
      }
      this.socket.emit(event, body)
    }
  }
}

module.exports = SocketService

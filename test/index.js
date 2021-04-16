const fs = require("fs")
const path = require("path")

describe("endpoints", () => {
  fs.readdirSync(__dirname + "/lib").forEach((file) => {
    require(path.resolve(__dirname, "lib", file))()
  })
})

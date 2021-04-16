if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const createError = require("http-errors")
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const usersRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const projectsRoute = require("./routes/projects")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/static", express.static("public"))

app.use(usersRoute)
app.use(postsRoute)
app.use(projectsRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500).json(err)
})

module.exports = app

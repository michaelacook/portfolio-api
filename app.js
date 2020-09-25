const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const routes = require("./routes/index")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static', express.static('public'))

app.use("/", routes)

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
  res.status(err.status || 500).json(err.stack)
})

module.exports = app
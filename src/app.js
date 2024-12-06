const express = require("express")

const userRouter = require("./routes/userRoute")
const portfolioRouter = require("./routes/portfolioRoute")
const serviceRouter = require("./routes/serviceRoute")
const bookRouter = require("./routes/bookRoute")
const AppError = require("./utils/appError")


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/user", userRouter)
app.use("/portfolio", portfolioRouter)
app.use("/service", serviceRouter)
app.use("/book", bookRouter)

app.all("*", (req, res, next) => {
  return next(new AppError("Not found please check the url and try again", 404))
})

app.use(( err, req, res, next ) => {
  console.log(err)

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    stack: err.stack
  })
})



module.exports = app


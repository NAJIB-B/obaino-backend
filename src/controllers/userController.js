const Joi = require("joi")
const jwt = require("jsonwebtoken")

const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const User = require("../models/userModel")


const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})


const signToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

exports.signup = catchAsync(async(req, res, next) => {

  const {error, value} = signupSchema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Password and confirm password should be the same", 400))
  }

  const body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  const user = await User.create(body)

  const token = signToken(user._id)
  user.password = undefined

  res.status(201).json({
    message: "success",
    token,
    user
  })

})

exports.login = catchAsync(async(req, res, next) => {

  const {error, value} = loginSchema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))
  }

  const user = await User.findOne({email: req.body.email}).select("+password")
  

  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return next(new AppError("email or password is not correct", 401));
  }

  const token = signToken(user._id)

  user.password = undefined
  res.status(200).json({
    message: "success",
    token,
    user
  })
})

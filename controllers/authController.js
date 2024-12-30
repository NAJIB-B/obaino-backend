const jwt = require("jsonwebtoken")

const {promisify} = require("util") 

const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const User = require("../models/userModel")



exports.protect = catchAsync(async(req, res, next) => {


  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError(`Please login to access this endpoint ${JSON.stringify(req.headers)}` , 401))
  }


  const secret = process.env.JWT_SECRET
  const decoded = await promisify(jwt.verify)(token, secret)

  const currentUser = await User.findById(decoded.id)


  if (!currentUser) {
    return next(new AppError("The user that own this token no longer exist", 401))
  }

  req.user = currentUser
  next()

})

const Joi = require("joi")

const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const Portfolio = require("../models/portfolioModel")

const portfolioSchema = Joi.object({
  name: Joi.string().required(),
})


const validateFile = (file) => {
  if (file.size <= 0) {
    throw new AppError("The file shouldn't be empty", 400);
  }

  const sizeInMb = file.size / (1024 * 1024);

  if (sizeInMb > 16) {
    throw new AppError(
      "The file exceeds the file limit. The limit is 16mb",
      400,
    );
  }
};

exports.getPortfolio = catchAsync(async(req, res, next) => {

  const portfolio = await Portfolio.findOne({user: req.user._id}) //.populate("services")

  res.status(200).json({
    message: "success",
    portfolio
  })
})


exports.createPortfolio = catchAsync(async(req, res, next) => {

  const { error, value } = portfolioSchema.validate(req.body)

  if (error) {

    return next(new AppError(error.message, 400))
  }

  if (!req.file) {
    return next(new AppError("please upload and image", 400))
  }

  validateFile(req.file)


  const body = {
    [req.body.name]: req.file.buffer,
    user: req.user._id

  }

  const portfolio = await Portfolio.create(body)

  res.status(200).json({
    message: "success",
    portfolio
  })
})

exports.updatePortfolio = catchAsync(async(req, res, next) => {

  
  if (!req.file) {
    return next(new AppError("please upload and image", 400))
  }

  validateFile(req.file)

  const data = {
    [req.body.name]: req.file.buffer 
  }


  const userId = req.user._id

  const portfolio = await Portfolio.findOneAndUpdate({user: userId}, data, {new: true})

  res.status(200).json({
    message: "success",
    portfolio
  })
})


exports.updateVideo = catchAsync(async(req, res, next) => {

  if (!req.body.link) {
    return next(new AppError("Video must have a link", 400))
  }

  const userId = req.user._id

  const data = {
    video: req.body.link
  }

  const portfolio = await Portfolio.findOneAndUpdate({user: userId}, data, {new: true})

  res.status(200).json({
    message: "success",
    portfolio
  })

})

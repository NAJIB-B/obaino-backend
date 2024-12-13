const Joi = require("joi")

const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const Service = require("../models/servicesModel")
const Portfolio = require("../models/portfolioModel")
const uploadImageToS3 = require("../utils/uploadImage")

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

const serviceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})

exports.getServices = catchAsync(async(req, res, next) => {

  const services = await Service.find()

  res.status(200).json({
    message: "success",
    services
  })
})

exports.createService = catchAsync(async(req, res, next) => {
 const {error, value} = serviceSchema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400))

  }

  if (!req.file) {
    return next(new AppError("please upload and image", 400))
  }

  validateFile(req.file)

  const imageUrl = await uploadImageToS3(req.file, `${Date.now()}_${req.file.originalname}`)

  const data = {
    title: req.body.title,
    description: req.body.description,
    image: imageUrl
  }
  const service = await Service.create(data)

  const portfolio = await Portfolio.findOne({user:req.user._id})


  if (portfolio) {
    portfolio.services.push(service._id);
   const neww = await portfolio.save();
  }


  res.status(201).json({
    message: "success",
    service
  })
})


exports.updateService = catchAsync(async(req, res, next) => {
  const serviceId = req.params.serviceId

  if (!req.file) {
    return next(new AppError("please upload and image", 400))
  }

  validateFile(req.file)

  const imageUrl = await uploadImageToS3(req.file, `${Date.now()}_${req.file.originalname}`)

  const data = {
    title: req.body.title,
    description: req.body.description,
    image: imageUrl 
  }
  const service = await Service.findByIdAndUpdate(serviceId, data, {new: true})

  res.status(200).json({
    message: "success",
    service
  })
})

exports.deleteService = catchAsync(async(req, res, next) => {
  const serviceId = req.params.serviceId

  const service = await Service.findByIdAndDelete(serviceId)
  await Portfolio.updateMany(
    { services: serviceId }, 
    { $pull: { services: serviceId } },
  );

  res.status(204).json({
    message: "success",
  })
})

exports.getAService = catchAsync(async(req, res, next) => {
  const serviceId = req.params.serviceId

  const service = await Service.findById(serviceId)

  res.status(200).json({
    message: "success",
    service
  })
})

const Joi = require("joi");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Book = require("../models/bookModel");
const Portfolio = require("../models/portfolioModel");

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

const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  link: Joi.string().required(),
});

exports.getBooks = catchAsync(async (req, res, next) => {
  const Books = await Book.find();

  res.status(200).json({
    message: "success",
    Books,
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { error, value } = bookSchema.validate(req.body);

  if (error) {
    return next(new AppError(error.message, 400));
  }

  if (!req.file) {
    return next(new AppError("please upload and image", 400));
  }

  validateFile(req.file);

  const data = {
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    image: req.file.buffer,
  };
  const book = await Book.create(data);

  const portfolio = await Portfolio.findOne({ user: req.user._id });

  if (portfolio) {
    portfolio.books.push(book._id);
    const neww = await portfolio.save();
  }

  res.status(201).json({
    message: "success",
    book,
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const bookId = req.params.bookId;

  const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

  res.status(200).json({
    message: "success",
    book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const bookId = req.params.bookId;

  const book = await Book.findByIdAndDelete(bookId);
  await Portfolio.updateMany(
    { books: bookId }, 
    { $pull: { books: bookId } },
  );

  res.status(204).json({
    message: "success",
  });
});

exports.getABook = catchAsync(async (req, res, next) => {
  const bookId = req.params.bookId;

  const book = await Book.findById(bookId);

  res.status(200).json({
    message: "success",
    book,
  });
});

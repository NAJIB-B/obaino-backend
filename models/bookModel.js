
const mongoose = require("mongoose")


const bookModel = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String
  }
})

const Book = mongoose.model("Book", bookModel)

module.exports = Book

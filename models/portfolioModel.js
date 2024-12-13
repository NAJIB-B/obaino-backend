const { string, required } = require("joi");
const mongoose = require("mongoose");

const portfolioSchma = new mongoose.Schema({
  video: {
    type: String,
  },
  topLeftImage: {
    type: String,
  },
  topRightImage: {
    type: String,
  },

  topCenterImg1: {
    type: String,
  },

  topCenterImg2: {
    type: String,
  },
  circleImg1: {
    type: String,
  },
  circleImg2: {
    type: String,
  },

  circleImg3: {
    type: String,
  },

  circleImg4: {
    type: String,
  },

  circleImg5: {
    type: String,
  },

  circleImg6: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "A portfolio must have a user"]
  },
  services: [{type: mongoose.Schema.Types.ObjectId, ref: 'Service'}],
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});


const Portfolio = mongoose.model("Portfolio", portfolioSchma)

module.exports = Portfolio

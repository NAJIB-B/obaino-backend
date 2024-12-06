const { string, required } = require("joi");
const mongoose = require("mongoose");

const portfolioSchma = new mongoose.Schema({
  video: {
    type: String,
  },
  topLeftImage: {
    type: Buffer,
  },
  topRightImage: {
    type: Buffer,
  },

  topCenterImg1: {
    type: Buffer,
  },

  topCenterImg2: {
    type: Buffer,
  },
  circleImg1: {
    type: Buffer,
  },
  circleImg2: {
    type: Buffer,
  },

  circleImg3: {
    type: Buffer,
  },

  circleImg4: {
    type: Buffer,
  },

  circleImg5: {
    type: Buffer,
  },

  circleImg6: {
    type: Buffer,
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

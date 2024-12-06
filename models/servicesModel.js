const mongoose = require("mongoose")


const serviceModel = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: Buffer
  }
})

const Service = mongoose.model("Service", serviceModel)

module.exports = Service

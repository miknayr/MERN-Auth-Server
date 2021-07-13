const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: String,
  time: Number,
  message: String
}, {
  timestamps: true
})

module.exports = Meetup
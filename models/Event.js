const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: String,
  location: String,
  friend: String
  
  
}, {
  timestamps: true
})

module.exports = EventSchema
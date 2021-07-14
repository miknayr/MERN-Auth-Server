const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: String,
  location: Array,
  friend: mongoose.Schema.Types.ObjectId, ref:'User'
  
  
}, {
  timestamps: true
})

module.exports = EventSchema
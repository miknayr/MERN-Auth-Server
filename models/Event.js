const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: String,
  
  location: [{
    type: mongoose.Schema.Types.ObjectId, ref:'Location'
  }]
  
}, {
  timestamps: true
})

module.exports = EventSchema
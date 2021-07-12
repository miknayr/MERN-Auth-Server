const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: String,
  location: String,
  zoneList: Array
}, {
  timestamps: true
})

module.exports = EventSchema
const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
  eventName: {String},

  friend:[{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}],
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
  
}, {
  timestamps: true
})

module.exports = EventSchema

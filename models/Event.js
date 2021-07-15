const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  eventName: String,
<<<<<<< HEAD
  location: String,
  friend: String
=======
>>>>>>> 0c6eae29927d78fa5c0afcd17ff12eaac7af1fb7
  
  location: [{
    type: mongoose.Schema.Types.ObjectId, ref:'Location'
  }]
  
}, {
  timestamps: true
})

module.exports = EventSchema
const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
  eventName: {String},

  friend:[{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}],
<<<<<<< HEAD

  location: {
    type: mongoose.Schema.Types.ObjectId, ref:'Location'
  }
=======
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
>>>>>>> 60a8c247df2d3f5c6f28a91ad488fa4401ee631d
  
}, {
  timestamps: true
})

module.exports = EventSchema

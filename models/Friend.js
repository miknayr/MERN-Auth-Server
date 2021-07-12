const mongoose = require('mongoose')

const friendsSchema = new mongoose.Schema({
  requester: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  recipient: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

module.exports = friendsSchema
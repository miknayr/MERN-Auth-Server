const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type:String, 
    required:true
  },
  password: String,
  email: {
    type:String,
    required:true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId, ref:'User'
  }],
  // event: [{
  //   type: mongoose.Schema.Types.ObjectId, ref:'User'
  // }],
}, {
  timestamps: true
})

module.exports = UserSchema
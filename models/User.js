const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String, 
  password: String,
  email: String,
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
}],
}, {
  timestamps: true
})

module.exports = UserSchema
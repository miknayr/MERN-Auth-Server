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
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Event'
    }]
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    location: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
  }]
>>>>>>> 9928a89a2600fb0821b0af410e0af811e89448a6
}, { timestamps: true })

module.exports = UserSchema
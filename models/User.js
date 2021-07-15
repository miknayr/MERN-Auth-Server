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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    location: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }]
}, { timestamps: true })

module.exports = UserSchema
const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({

    name: {
        type: String, 
        required:true
    },

    user: [{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }]
}, { timestamps: true })


module.exports = LocationSchema

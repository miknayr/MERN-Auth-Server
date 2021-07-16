const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({

    name: String
    ,

    user: [{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }]
}, { timestamps: true })


module.exports = LocationSchema

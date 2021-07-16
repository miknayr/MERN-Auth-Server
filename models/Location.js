const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({

    name: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        }],

    user: [{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }]
}, { timestamps: true })


module.exports = LocationSchema

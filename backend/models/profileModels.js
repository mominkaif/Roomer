const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)


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
    },
    hobbies: {
        type: String,
        required: true
    },
    diet: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    postImage: {
        myFile: {type: String, required: true},
    },
    userID: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)
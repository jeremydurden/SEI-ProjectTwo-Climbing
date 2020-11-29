const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID

const commentSchema = new mongoose.Schema({
    userName: String,
    userId: ObjectId,
    text: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
}, {
    timestamps: true
})

const notesSchema = new mongoose.Schema({
    text: String,
    userId: ObjectId
})

const routeSchema = new mongoose.Schema({
    name: String,
    location: String,
    style: String,
    difficultyRating: String,
    firstAscent: String,
    description: String,
    comment: [commentSchema],
    userNotes: [notesSchema],
    routesClimbed: [ObjectId],
    wishList: [ObjectId]
})

module.exports = mongoose.model('Route', routeSchema)
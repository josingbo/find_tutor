const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
})

const TutorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    subject: {
        type: String,
        required: [true, 'Subject field is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
})

const Tutor = mongoose.model('tutor', TutorSchema)

module.exports = Tutor
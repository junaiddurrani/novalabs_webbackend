const mongoose = require('mongoose')
const { Schema } = mongoose

const AppointmentsSchema = new Schema(
    {
        sellerid: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Pending'
        },
        atime: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('appointments', AppointmentsSchema)
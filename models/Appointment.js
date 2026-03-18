const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    dentistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dentist',
        required: true
    },
    dentistName: {
        type: String,
        required: true
    },
    clinicName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Cancelled'],
        default: 'Booked'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
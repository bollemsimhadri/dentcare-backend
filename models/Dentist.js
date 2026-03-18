const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    qualification: { 
        type: String, 
        required: true 
    },
    experience: { 
        type: Number, 
        required: true 
    },
    clinicName: { 
        type: String, 
        required: true
     },
    address: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String, 
        default: '' 
    },
    specialization: { 
        type: String, 
        default: 'General Dentistry' 
    }
});

const Dentist = mongoose.model("Dentist", DentistSchema);
module.exports = Dentist;



const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/createappointment', async (req, res) => {
    try {
        const {
            patientName,
            age,
            gender,
            appointmentDate,
            dentistId,
            dentistName,
            clinicName,
            status
        } = req.body;

        if (!dentistId) {
            return res.status(400).json({ error: "dentistId is required" });
        }

        const newAppointment = new Appointment({
            patientName,
            age,
            gender,
            appointmentDate,
            dentistId,
            dentistName,
            clinicName,
            status
        });

        await newAppointment.save();

        res.status(201).json({
            message: "Appointment successfully booked",
            data: newAppointment
        });

    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/allappointments', async (req, res) => {
    try {
        const appointments = await Appointment
            .find()
            .sort({ createdAt: -1 })
            .populate('dentistId'); 

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.patch('/:id/status', async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
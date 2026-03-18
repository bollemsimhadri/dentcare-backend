const express = require("express");
const multer = require("multer");
const Dentist = require("../models/Dentist");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.post("/addDentist", upload.single("photo"), async (req, res) => {
    try {
        const { name, qualification, experience, clinicName, address, location, specialization } = req.body;

        const photo = req.file ? req.file.filename : null;

        const newDentist = new Dentist({
            name,
            qualification,
            experience,
            clinicName,
            address,
            location,
            specialization,
            photo
        });

        await newDentist.save();

        return res.status(200).json({
            message: "Dentist added successfully",
            data: newDentist
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/getDentist", async (req, res) => {
    try {
        const dentists = await Dentist.find()
        res.json(dentists)
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Internal server error" });
    }
})

module.exports = router;
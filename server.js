const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const dentistRouter = require("./routes/dentistRoutes")
const appointmentRouter = require("./routes/appointmentRoutes");

const app = express();

const PORT = 4000;
dotEnv.config();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongodg sucessfully connected"))
.catch((error)=> console.log(`${error}`))


app.use("/dentist", dentistRouter)
app.use("/allDentist", dentistRouter)
app.use("/api/appointments", appointmentRouter);

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
});

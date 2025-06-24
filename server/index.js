const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));


const MONGO_URI = process.env.MONGO_URI;
const connectDb = () => {
    mongoose.connect('mongodb+srv://tanmaychamat:6SzOi5IHxbfVHQTd@cluster0.cbzksif.mongodb.net/doctorDB')   
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err))
};

connectDb();

app.get('/api/doctors', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors); // For React
 //res.render('doctors', { doctors });
});

app.get('/doctor/:id', async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctor', { doctor }); // SSR
});



app.listen(PORT, () => {
    console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
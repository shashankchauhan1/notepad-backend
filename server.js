const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes.js");
const authRoutes = require("./routes/auth.js"); 

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://nottepreziosa.netlify.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));


app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes); 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running on port ${process.env.PORT || 7000}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});


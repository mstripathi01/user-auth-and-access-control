const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// app.use('/api', require('./routes/auth'));

// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.SERVER_URL);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const studentsRoute = require('./routes/students')
// Import Routes
const authRoute = require("./routes/auth"); 

dotenv.config();

// Add connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

//Middleware
app.use(express.json());

// Routes Middleware
app.use("/api/user", authRoute);
app.use("/api/students", studentsRoute);

app.listen(3000, () => console.log("Server is up and running"));

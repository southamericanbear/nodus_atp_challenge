require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/spreadsheet"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in port ${PORT}`));

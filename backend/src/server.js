require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { saveLogs } = require("./controller/databaseLogs");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

app.use("/", require("./routes/spreadsheet"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  saveLogs(req.url, "Error");
  next(error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in port ${PORT}`));

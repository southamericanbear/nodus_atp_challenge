require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", require("./spreadsheet"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in port ${PORT}`));

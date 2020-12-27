const mongoose = require("mongoose");

const LogsController = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  req: String,
  type: String,
});

module.exports = mongoose.model("logsController", LogsController);

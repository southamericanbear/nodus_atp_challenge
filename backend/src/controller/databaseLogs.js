const LogsController = require("../model/logsControllerSchema");

const saveLogs = async (req, type) => {
  const log = new LogsController({
    req: req,
    type: type,
  });
  await log
    .save()
    .then()
    .catch((err) => console.log(err));
};

const getLogs = async () => {
  const logs = await LogsController.find();
  console.log(logs);
  return logs;
};

module.exports = {
  saveLogs,
  getLogs,
};

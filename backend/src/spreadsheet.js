require("dotenv").config();
const Router = require("express");
const router = Router();
const { google } = require("googleapis");
const keys = require("./client_secret.json");
const spreadsheetID = process.env.SPREADSHEET_ID;

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
]);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected");
    getChamps(client);
  }
});

const getChamps = async (cl) => {
  const dataAPI = await google.sheets({ version: "v4", auth: cl });
  const options = {
    spreadsheetId: spreadsheetID,
    range: "A:AB",
  };
  let data = await dataAPI.spreadsheets.values.get(options);
  let tournamentArchive = data.data.values;

  let rolandGarros = filterTourneySlug(tournamentArchive, "520");
  resgarros = joinData(rolandGarros[0][1], rolandGarros[5][2], "love");
};

function filterTourneySlug(tournamentArchive, tourney_id) {
  return tournamentArchive.filter((tourney) => tourney[3] == tourney_id);
}

function joinData(player, wins, date) {
  return { player: player, wins: wins, lastWin: date };
}

router.route("/").get((req, res) => {
  console.log("hello");
  res.send(resgarros);
});

module.exports = router;

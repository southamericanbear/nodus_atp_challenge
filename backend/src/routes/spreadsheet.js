require("dotenv").config();
const Router = require("express");
const router = Router();
const { google } = require("googleapis");
const keys = require("../client_secret.json");
const spreadsheetID = process.env.SPREADSHEET_ID;

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
]);

client.authorize((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected to Google Sheet's");
    getChamps(client);
  }
});

const getChamps = async (client) => {
  const dataAPI = await google.sheets({ version: "v4", auth: client });
  const options = {
    spreadsheetId: spreadsheetID,
    range: "A:AB",
  };
  let data = await dataAPI.spreadsheets.values.get(options);
  let tournamentArchive = data.data.values;

  let usO = filterTournament(tournamentArchive, "560");
  let usOWinners = getWinners(usO);
  const lastTimeWonHistoricChampUsOpen = lastChamp(usOWinners[0][0], usO);
  resUsO = joinData(
    usOWinners[0][0],
    usOWinners[0][1],
    lastTimeWonHistoricChampUsOpen
  );

  let aussieO = filterTournament(tournamentArchive, "580");
  let aussieWinners = getWinners(aussieO);
  const lastTimeWonHistoricChampAussie = lastChamp(
    aussieWinners[0][0],
    aussieO
  );
  resAussie = joinData(
    aussieWinners[0][0],
    aussieWinners[0][1],
    lastTimeWonHistoricChampAussie
  );

  let wimbledon = filterTournament(tournamentArchive, "540");
  let wimWinners = getWinners(wimbledon);
  const lastTimeWonHistoricChampWim = lastChamp(wimWinners[0][0], wimbledon);
  resWim = joinData(
    wimWinners[0][0],
    wimWinners[0][1],
    lastTimeWonHistoricChampWim
  );

  let rg = filterTournament(tournamentArchive, "520");
  let rgWinners = getWinners(rg);
  const lastTimeWonHistoricChampRg = lastChamp(rgWinners[0][0], rg);
  resRG = joinData(
    rgWinners[0][0],
    rgWinners[0][1],
    lastTimeWonHistoricChampRg
  );
};

const filterTournament = (tournamentArchive, atp_id) => {
  return tournamentArchive.filter((atp) => atp[3] == atp_id);
};

const getWinners = (t_slug) => {
  result = {};
  for (let i = 0; i < t_slug.length; ++i) {
    if (!result[t_slug[i][15]]) {
      result[t_slug[i][15]] = 0;
    }
    result[t_slug[i][15]]++;
  }
  const entries = Object.entries(result);
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  return sorted;
};

const lastChamp = (player, tournamentSlug) => {
  const result = tournamentSlug.filter((atp) => atp[15] == player);
  return result[result.length - 1][6];
};

const joinData = (player, wins, date) => {
  return { player: player, wins: wins, lastWin: date };
};

router.route("/usopen").get((req, res) => {
  console.log("Us Open data requested");
  res.send(resUsO);
});

router.route("/wimbledon").get((req, res) => {
  console.log("Wimbledon data requested");
  res.send(resWim);
});

router.route("/ausopen").get((req, res) => {
  console.log("Australian Open data requested");
  res.send(resAussie);
});

router.route("/rolandgarros").get((req, res) => {
  console.log("Rolang Garros data requested");
  res.send(resRG);
});

module.exports = router;

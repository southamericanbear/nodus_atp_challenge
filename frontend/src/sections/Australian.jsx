import React, { useState, useEffect } from "react";
import axios from "axios";

const Australian = () => {
  const API = "http://localhost:5000/";

  const [mostWinner, setmostWinner] = useState("");
  const [wins, setWins] = useState("");
  const [lastWin, setLastWin] = useState("");
  const [allWinners, setAllWinners] = useState([]);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setmostWinner(res.data.player);
        setWins(res.data.wins);
        setLastWin(res.data.lastWin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/australianWinners`)
      .then((res) => {
        setAllWinners((allWinners) => [...allWinners, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{mostWinner}</h1>
      <h1>{wins}</h1>
      <h1>{lastWin}</h1>
      <h1>{allWinners}</h1>
    </div>
  );
};

export default Australian;

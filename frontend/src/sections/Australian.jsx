import React, { useState, useEffect } from "react";
import axios from "axios";

const Australian = () => {
  const API = "http://localhost:5000/";

  const [mostWinner, setmostWinner] = useState("");
  const [wins, setWins] = useState("");
  const [lastWin, setLastWin] = useState("");

  useEffect(() => {
    axios
      .get(`${API}ausopen`)
      .then((res) => {
        console.log(res);
        setmostWinner(res.data.player);
        setWins(res.data.wins);
        setLastWin(res.data.lastWin);
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
    </div>
  );
};

export default Australian;

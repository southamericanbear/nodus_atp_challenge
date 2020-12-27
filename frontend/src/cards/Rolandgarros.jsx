import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RolandGarros = () => {
  const API = "http://localhost:5000/";

  const [champ, setChamp] = useState("");
  const [wins, setWins] = useState("");
  const [lastWin, setLastWin] = useState("");
  const year = lastWin.slice(0, 5);

  useEffect(() => {
    axios
      .get(`${API}rolandgarros`)
      .then((res) => {
        setChamp(res.data.player);
        setWins(res.data.wins);
        setLastWin(res.data.lastWin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      className="flex-container"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", delay: 0.5 }}
    >
      <Link className="nextpage-btn-left" to="/wimbledon">
        <motion.button className="btn -btn-bg-grey arrow-right">
          <FontAwesomeIcon className="arrow-left" icon={faLongArrowAltLeft} />
        </motion.button>
      </Link>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="logo" className={classes.avatar}>
              <img
                style={{ width: "100%" }}
                src="https://logos-download.com/wp-content/uploads/2016/10/Roland_Garros_logo.png"
                alt="usopen logo"
              />
            </Avatar>
          }
          title={champ}
        />
        <CardMedia
          className={classes.media}
          image="https://elintra.com.ar/wp-content/uploads/2020/08/Rafael-Nadal.jpg"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Rafael "Rafa" Nadal Parera (Catalan: [rəf(ə)ˈɛl nəˈðal pəˈɾeɾə],
            Spanish: [rafaˈel naˈðal paˈɾeɾa];[5] born 3 June 1986) is a Spanish
            professional tennis player. He is ranked No. 2 in the world by the
            Association of Tennis Professionals (ATP), has been ranked No. 1 in
            the ATP rankings for 209 weeks, and has finished as the year-end No.
            1 five times. Nadal has won 20 Grand Slam men's singles titles, tied
            for the most in history with Roger Federer.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <span className="more-info" style={{ marginLeft: "151px" }}>
            More info
          </span>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show More"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "300 !important",
              padding: "15px",
            }}
          >
            {champ} has won the Roland Garros {wins} times , the last time he
            became the champ was in the edition of the year {year}
          </p>
        </Collapse>
      </Card>
      <Link className="nextpage-btn-right" to="/australianopen">
        <motion.button className="btn  btn-bg-grey arrow-right" animate={{}}>
          <FontAwesomeIcon className="arrow-right" icon={faLongArrowAltRight} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default RolandGarros;

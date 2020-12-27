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

const Usopen = () => {
  const API = "http://localhost:5000/";

  const [champ, setChamp] = useState("");
  const [wins, setWins] = useState("");
  const [lastWin, setLastWin] = useState("");
  const year = lastWin.slice(0, 5);

  useEffect(() => {
    axios
      .get(`${API}usopen`)
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
      <Link className="nextpage-btn-left" to="/australianopen">
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
                src="https://brandemia.org/sites/default/files/inline/images/us_open_despues.jpg"
                alt="usopen logo"
              />
            </Avatar>
          }
          title={champ}
        />
        <CardMedia
          className={classes.media}
          image="https://historiasdeportivas.files.wordpress.com/2010/11/billtildnecorbisimages1.jpg"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            William Tatem Tilden II (February 10, 1893 – June 5, 1953),
            nicknamed "Big Bill," was an American male tennis player. Tilden was
            the world No. 1 player for six years from 1920 through 1925. He won
            14 Major singles titles, including 10 Grand Slam events, one World
            Hard Court Championships and three professional majors. He was the
            first American to win Wimbledon, taking the title in 1920.
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
            {champ} has won the Us Open {wins} times , the last time he became
            the champ was in the edition of the year {year}
          </p>
        </Collapse>
      </Card>
      <Link className="nextpage-btn-right" to="/wimbledon">
        <motion.button className="btn  btn-bg-grey arrow-right" animate={{}}>
          <FontAwesomeIcon className="arrow-right" icon={faLongArrowAltRight} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Usopen;

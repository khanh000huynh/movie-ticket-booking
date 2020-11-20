import { CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";
import Trailer from "../Trailer/trailer";

const Slide = (props) => {
  const { movie } = props;
  const { hinhAnh, trailer } = movie;
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.text.primary,
    },
    slide: {
      cursor: "pointer",
      position: "relative",
      backgroundSize: "contain",
      "&:hover $trailer": {
        opacity: 1,
      },
      [theme.breakpoints.down("xl")]: {
        height: 650,
      },
      [theme.breakpoints.down("lg")]: {
        height: 550,
      },
      [theme.breakpoints.down("md")]: {
        height: 400,
      },
      [theme.breakpoints.down("sm")]: {
        backgroundSize: "cover",
      },
    },
    trailer: {
      opacity: 0,
      transition: theme.transitions.duration,
      [theme.breakpoints.down("sm")]: {
        opacity: 1,
      },
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardMedia className={classes.slide} image={hinhAnh}>
        <div className={classes.trailer}>
          <Trailer trailer={trailer} />
        </div>
      </CardMedia>
    </div>
  );
};

export default Slide;

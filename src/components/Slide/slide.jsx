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
      "& > div": {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
    },
    slide: {
      cursor: "pointer",
      position: "relative",
      "&:hover $trailer": {
        opacity: 1,
      },
      [theme.breakpoints.down("lg")]: {
        height: 653,
      },
      [theme.breakpoints.down("md")]: {
        height: 500,
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
      [theme.breakpoints.down("xs")]: {
        "& img": {
          width: 50,
          height: 50,
        },
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

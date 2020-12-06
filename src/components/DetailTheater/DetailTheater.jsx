import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { withRouter } from "react-router-dom";
import theme from "../../theme/theme";
import Showtime from "../Showtime/Showtime";
import TheaterList from "../TheaterList/TheaterList";

const useStyles = makeStyles({
  tech: {
    margin: theme.spacing(1, 0),
    fontWeight: 500,
    cursor: "default",
  },
  showtimeSkeleton: {
    [theme.breakpoints.down("lg")]: {
      boxSizing: "border-box",
      padding: theme.spacing(0, 2),
    },
  },
  showtimeGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
});

const DetailTheater = (props) => {
  const classes = useStyles();
  const { theater, lichChieuPhim } = props;

  const renderShowtime = () => {
    if (lichChieuPhim.maLichChieu)
      return [...new Array(6)].map((arr, index) => (
        <Grid
          item
          xs={12}
          sm={2}
          md={3}
          key={index}
          className={classes.showtimeSkeleton}
        >
          <Skeleton width="100%" height={50} animation="wave" />
        </Grid>
      ));

    return lichChieuPhim.map((lichChieu, index) => (
      <Showtime showtime={lichChieu} key={index} />
    ));
  };

  return (
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary>
        <TheaterList theater={theater} />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} container className={classes.showtimeGrid}>
            {renderShowtime()}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default withRouter(DetailTheater);

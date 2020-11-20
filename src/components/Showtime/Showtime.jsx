import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setDelayTask } from "../../redux/actions/delayTaskActions";
import theme from "../../theme/theme";
import { calculateShowtime } from "../../utils/showtime";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.grey[350],
    color: theme.palette.grey[50],
    border: "1px solid " + theme.palette.grey[250],
    fontWeight: 500,
    padding: theme.spacing(0.2, 0.8),
    margin: theme.spacing(1, 1.5, 0.5, 0),
    "&:hover": {
      backgroundColor: theme.palette.grey[350],
      "& $green": {
        color: theme.palette.warning.main,
      },
    },
  },
  gray: {
    fontSize: "1em",
    fontWeight: 700,
  },
  green: {
    fontSize: "1.15rem",
    color: theme.palette.success.main,
  },
});

const Showtime = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showtime } = props;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const user = useSelector((state) => state.user.credentials);

  const handleBookTicket = () => {
    sessionStorage.setItem(
      "ngayChieuGioChieu",
      JSON.stringify(showtime.ngayChieuGioChieu)
    );
    sessionStorage.setItem(
      "chosenTheaterSystem",
      JSON.stringify({
        maHeThongRap: chosenTheaterSystem.maHeThongRap,
        logo: chosenTheaterSystem.logo,
      })
    );
    if (!user.accessToken) {
      dispatch(setDelayTask({ destination: `/muave/${showtime.maLichChieu}` }));
    }
    props.history.push(`/muave/${showtime.maLichChieu}`);
  };

  return (
    <Button className={classes.root} onClick={handleBookTicket}>
      <Typography component="span" className={classes.green}>
        {
          calculateShowtime(showtime.ngayChieuGioChieu, showtime.thoiLuong)
            .startTime
        }
      </Typography>
      <Typography component="span" className={classes.gray}>
        &nbsp;~{" "}
        {
          calculateShowtime(showtime.ngayChieuGioChieu, showtime.thoiLuong)
            .endTime
        }
      </Typography>
    </Button>
  );
};

export default withRouter(Showtime);

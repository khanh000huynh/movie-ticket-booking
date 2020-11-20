import {
  Box,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import WeekendRoundedIcon from "@material-ui/icons/WeekendRounded";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/img/no-image.png";
import { chooseTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import { getTheaterName } from "../../utils/theater";
import Chair from "../Chair/Chair";

const useStyles = makeStyles({
  theater: {
    padding: theme.spacing(4, 0, 2, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2) + "px 20px",
    },
  },
  theaterLogo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: "1rem",
    fontWeight: 500,
    "&:first-child": {
      color: theme.palette.success.main,
    },
  },
  time: {
    fontSize: "0.875rem",
    color: theme.palette.grey[150],
  },
  countDown: {
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
    "& p:nth-child(1)": {
      color: theme.palette.grey[150],
      fontSize: "0.75rem",
    },
    "& p:nth-child(2)": {
      color: theme.palette.error.dark,
      fontSize: "1.8rem",
    },
  },
  screen: {
    width: "100%",
    height: 12,
    backgroundColor: theme.palette.text.primary,
    marginBottom: 75,
    position: "relative",
    "&::after": {
      content: "'Màn hình'",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 4,
      width: "100%",
      height: 75,
      position: "absolute",
      top: 12,
      left: 0,
      backgroundImage:
        "linear-gradient(to bottom, gray 0%, lightgray 50%, " +
        theme.palette.grey[250] +
        " 75%, transparent)",
    },
  },
  chairList: {
    padding: theme.spacing(1.5, 8),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 0.5),
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  item: {
    width: "6.25%",
    height: 40,
    textAlign: "center",
    boxSizing: "border-box",
    padding: theme.spacing(0.5, 0.8),
    [theme.breakpoints.down("xs")]: {
      height: 20,
      padding: theme.spacing(0.3),
    },
  },
  sign: {
    textAlign: "center",
    "& > div:nth-child(1) svg": {
      color: "#3E515D",
    },
    "& > div:nth-child(2) svg": {
      color: "#F7B500",
    },
    "& > div:nth-child(3) svg": {
      color: theme.palette.success[150],
    },
    "& > div:nth-child(4) svg": {
      color: theme.palette.grey[250],
    },
  },
});

const BookTicketLeft = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { movieInfo, chairList, chosenChairList } = props;
  const { ngayChieu, gioChieu, tenCumRap, tenRap } = movieInfo;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheaterSystemLogo = React.useMemo(
    () => (chosenTheaterSystem.logo ? chosenTheaterSystem.logo : noImage),
    [chosenTheaterSystem.logo]
  );

  const renderChairList = React.useCallback(() => {
    return chairList.map((chair, index) => {
      return (
        <Box className={classes.item} key={index}>
          <Chair chair={chair} chosenChairList={chosenChairList} />
        </Box>
      );
    });
  }, [chairList, classes.item, chosenChairList]);

  React.useEffect(() => {
    const chosenTheaterSystemFromSession = JSON.parse(
      sessionStorage.getItem("chosenTheaterSystem")
    );
    if (
      chosenTheaterSystemFromSession.maHeThongRap &&
      !chooseTheaterSystem.maHeThongRap
    )
      dispatch(chooseTheaterSystem(chosenTheaterSystemFromSession));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid item container className={classes.theater}>
        <Grid item container xs>
          <CardMedia
            image={chosenTheaterSystemLogo}
            className={classes.theaterLogo}
          />
          <Box ml={2}>
            <Box display="flex" mb={0.5}>
              <Typography className={classes.title}>
                {getTheaterName(tenCumRap).prefix}
              </Typography>
              <Typography className={classes.title}>
                &nbsp;- {getTheaterName(tenCumRap).suffix}
              </Typography>
            </Box>
            <Typography className={classes.time}>
              {ngayChieu} - {gioChieu} - {tenRap}
            </Typography>
          </Box>
        </Grid>
        {/* <Grid item md={6} className={classes.countDown}>
          <Typography component="p">Thời gian giữ ghế</Typography>
          <Typography component="p">05:00</Typography>
        </Grid> */}
      </Grid>
      <Grid item className={classes.screen}></Grid>
      <Grid item className={classes.chairList}>
        <Box className={classes.row}>{renderChairList()}</Box>
      </Grid>
      <Grid item container className={classes.sign}>
        <Grid item xs>
          <WeekendRoundedIcon />
          <Typography>Ghế thường</Typography>
        </Grid>
        <Grid item xs>
          <WeekendRoundedIcon />
          <Typography>Ghế VIP</Typography>
        </Grid>
        <Grid item xs>
          <WeekendRoundedIcon />
          <Typography>Ghế đang chọn</Typography>
        </Grid>
        <Grid item xs>
          <WeekendRoundedIcon />
          <Typography>Ghế đã có người đặt</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BookTicketLeft;

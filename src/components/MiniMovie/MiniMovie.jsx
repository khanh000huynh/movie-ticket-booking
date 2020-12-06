import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import noImage from "../../assets/img/no-image.png";
import { setShowtime } from "../../redux/actions/movieActions";
import theme from "../../theme/theme";
import { toDMY } from "../../utils/showDate";
import { sortShowtime } from "../../utils/sort";
import Showtime from "../Showtime/Showtime";

const useStyles = makeStyles({
  root: {
    fontSize: theme.typography.fontSize - 2,
    fontWeight: 500,
    cursor: "pointer",
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
  media: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: "1.15em",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  green: {
    fontSize: "1.15rem",
    color: theme.palette.success.main,
  },
  address: {
    fontSize: "1em",
    color: theme.palette.grey[150],
  },
  detail: {
    fontSize: "1em",
    color: theme.palette.warning.main,
    fontWeight: 500,
  },
  age: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontWeight: 500,
    borderRadius: 6,
    padding: theme.spacing(0, 0.5),
    marginRight: theme.spacing(1),
    transition: theme.transitions.duration,
  },
  tech: {
    margin: theme.spacing(1, 0),
    fontWeight: 500,
    cursor: "default",
  },
  accordion: {
    "& .MuiAccordionSummary-content": {
      padding: 0,
      margin: 0,
    },
  },
});

const MiniMovie = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { movie } = props;
  const { hinhAnh, maPhim, tenPhim, danhGia } = movie;
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [showtimeList, setShowtimeList] = React.useState([]);
  const [thoiLuong, setThoiLuong] = React.useState(0);
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);
  const showtime = useSelector((state) => state.movie.showtime);

  const handleLoadedImage = React.useCallback((event) => {
    if (event.target.complete) setImageLoaded(true);
  }, []);

  const renderShowtime = React.useCallback(() => {
    if (!showtimeList.length)
      return (
        <Box mr={1.5}>
          <Skeleton width={114.65} height={48.4} animation="wave" />
        </Box>
      );

    const firstDate = showtimeList
      .filter((s, index) => index === 0)
      .map((s) => s.ngayChieuGioChieu);

    return showtimeList
      .filter(
        (showtime) => toDMY(showtime.ngayChieuGioChieu) === toDMY(firstDate)
      )
      .map((showtime, index) => <Showtime showtime={showtime} key={index} />);
  }, [showtimeList]);

  React.useEffect(() => {
    dispatch(setShowtime(maPhim));
  }, [dispatch, maPhim, movie]);

  React.useEffect(() => {
    const showtimeItem = showtime.filter((item) => item.maPhim === maPhim);
    if (!showtimeItem[0]) return;
    const heThongRapChieuIndex = showtimeItem[0].heThongRapChieu.findIndex(
      (rap) => rap.maHeThongRap === chosenTheaterSystem.maHeThongRap
    );
    const heThongRapChieu =
      showtimeItem[0].heThongRapChieu[heThongRapChieuIndex];
    const cumRapChieu = heThongRapChieu.cumRapChieu.filter(
      (rap) => rap.maCumRap === chosenTheater.maCumRap
    );
    const lichChieuPhim = cumRapChieu[0].lichChieuPhim;
    setThoiLuong(lichChieuPhim[0].thoiLuong);
    setShowtimeList(sortShowtime(lichChieuPhim));
  }, [
    showtime,
    maPhim,
    chosenTheaterSystem.maHeThongRap,
    chosenTheater.maCumRap,
  ]);

  return (
    <Grid item className={classes.root}>
      <Accordion defaultExpanded elevation={0} className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <img
            src={imageLoaded && hinhAnh ? hinhAnh : noImage}
            alt={hinhAnh}
            className={classes.media}
            onLoad={handleLoadedImage}
          />
          <Box
            width="100%"
            ml={1.5}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box width="100%">
              <Typography component="span" className={classes.age}>
                C18
              </Typography>
              <Typography component="span" className={classes.title}>
                {tenPhim}
              </Typography>
            </Box>
            <Typography className={classes.address}>
              {thoiLuong | 0} phút - đánh giá {danhGia | 0} / 10
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} container>
              {renderShowtime()}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default withRouter(MiniMovie);

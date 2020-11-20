import { Divider, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowing } from "../../redux/actions/movieActions";
import { setTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import MiniMovie from "../MiniMovie/MiniMovie";
import TheaterList from "../TheaterList/TheaterList";
import TheaterSystem from "../TheaterSystem/TheaterSystem";

const useStyles = makeStyles({
  root: {
    [theme.breakpoints.up("lg")]: {
      width: "65%",
    },
    [theme.breakpoints.down("md")]: {
      width: "88%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "97%",
    },
    margin: theme.spacing(5) + "px auto",
    border: "1px solid " + theme.palette.grey[250],
    borderRadius: 4,
  },
  divider: {
    backgroundColor: theme.palette.grey[250],
    width: "100%",
    height: 1,
    margin: theme.spacing(2, 0),
    padding: 0,
  },
  verticalDivider: {
    borderLeft: "1px solid " + theme.palette.grey[250],
    [theme.breakpoints.down("xs")]: {
      borderLeft: "none",
    },
  },
  theaterSystem: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
      paddingBottom: "0 !important",
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: 249,
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: 705,
    },
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[50],
    },
  },
  theaterList: {
    maxHeight: 705,
    [theme.breakpoints.down("xs")]: {
      maxHeight: 249,
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: 249,
    },
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[50],
    },
  },
  movieList: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("xs")]: {
      height: 393,
    },
    [theme.breakpoints.up("md")]: {
      height: 705,
    },
    [theme.breakpoints.up("sm")]: {
      borderTop: "1px solid " + theme.palette.grey[250],
    },
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[50],
    },
  },
});

const Theater = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sectionId } = props;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);
  const movieList = useSelector((state) => state.movie.movieList);
  const theaterSystem = useSelector((state) => state.theater.theaterSystem);
  const theaterList = useSelector((state) => state.theater.theaterList);
  const showing = useSelector((state) => state.movie.showing);

  React.useEffect(() => {
    dispatch(setTheaterSystem());
    dispatch(setShowing());
  }, [dispatch]);

  const renderTheaterSystem = React.useCallback(() => {
    return theaterSystem.map((system, index) => (
      <Grid item xs={4} sm={12} key={index}>
        <TheaterSystem system={system} />
        <Divider className={classes.divider} />
      </Grid>
    ));
  }, [theaterSystem, classes.divider]);

  const renderTheaterList = React.useCallback(() => {
    if (!theaterList.length)
      return [...new Array(8)].map((arr, index) => (
        <Grid item container justify="center" xs={12} key={index}>
          <Skeleton width="100%" height={50} animation="wave" />
          <Divider className={classes.divider} />
        </Grid>
      ));

    const theaters = theaterList.filter(
      (theater) => theater.maHeThongRap === chosenTheaterSystem.maHeThongRap
    )[0];

    if (!theaters) return;

    return theaters.theaters.map((theater, index) => (
      <Grid xs={12} item key={index}>
        <TheaterList
          theater={theater}
          defaultChosen={theaters.theaters[0].maCumRap === theater.maCumRap}
        />
        <Divider className={classes.divider} />
      </Grid>
    ));
  }, [theaterList, chosenTheaterSystem.maHeThongRap, classes.divider]);

  const renderMovieList = React.useCallback(() => {
    if (!showing.length)
      return [...new Array(8)].map((arr, index) => (
        <Grid item container justify="center" xs={12} key={index}>
          <Skeleton width="100%" height={120} animation="wave" />
          <Divider className={classes.divider} />
        </Grid>
      ));

    const showingTheaterSystemIndex = showing.findIndex(
      (item) => item.maHeThongRap === chosenTheaterSystem.maHeThongRap
    );
    const showingTheaterSystem = showing[showingTheaterSystemIndex];

    if (!showingTheaterSystem) return "Không có suất chiếu!";
    const showingTheater = showingTheaterSystem.lstCumRap.filter(
      (theater) => theater.maCumRap === chosenTheater.maCumRap
    );

    if (!showingTheater[0]) return "Không có suất chiếu!";
    const { danhSachPhim } = showingTheater[0];
    const maPhimList = danhSachPhim.map((phim) => phim.maPhim);
    const newDanhSachPhim = movieList.filter((movie) =>
      maPhimList.includes(movie.maPhim)
    );
    return newDanhSachPhim.map((movie, index) => (
      <Grid xs={12} item key={index}>
        <MiniMovie movie={movie} />
        <Divider className={classes.divider} />
      </Grid>
    ));
  }, [
    showing,
    chosenTheaterSystem.maHeThongRap,
    chosenTheater.maCumRap,
    movieList,
    classes.divider,
  ]);

  return (
    <Grid container spacing={4} className={classes.root} id={sectionId}>
      <Grid xs={12} sm={2} item className={classes.theaterSystem}>
        {renderTheaterSystem()}
      </Grid>
      <Grid
        xs={12}
        sm={10}
        md={4}
        item
        className={classnames(classes.theaterList, classes.verticalDivider)}
      >
        <Grid item container justify="flex-start" alignItems="center">
          {renderTheaterList()}
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={6}
        item
        className={classnames(classes.verticalDivider, classes.movieList)}
      >
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {renderMovieList()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Theater;

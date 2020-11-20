import { Divider, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "react-scroll";
import { setTheaterList } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import { getDayOfWeek, toDMY } from "../../utils/showDate";
import { groupShowDate } from "../../utils/showingDatetime";
import DetailTheater from "../DetailTheater/DetailTheater";
import DetailTheaterSystem from "../DetailTheaterSystem/DetailTheaterSystem";
import ShowDate from "../ShowDate/ShowDate";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    margin: "0 auto",
    marginBottom: theme.spacing(10),
  },
  left: {
    maxHeight: 713,
    borderRight: "1px solid " + theme.palette.grey[250],
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
  right: {
    height: "100%",
  },
  showDateList: {
    flexWrap: "nowrap",
    borderLeft: "1px solid " + theme.palette.grey[250],
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      height: 8,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[50],
    },
  },
  theaters: {
    height: "100%",
    [theme.breakpoints.up("xs")]: {
      height: 555,
      maxHeight: 555,
    },
    padding: theme.spacing(2.5),
    "& .MuiIconButton-edgeEnd": {
      marginRight: 0,
    },
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
  divider: {
    margin: theme.spacing(2, 0),
  },
});

const Detail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const theaterList = useSelector((state) => state.theater.theaterList);
  const detailShowDate = useSelector((state) => state.detail.detailShowDate);

  const renderTheaterSystem = React.useCallback(() => {
    const { heThongRapChieu } = detailMovie;
    if (!heThongRapChieu)
      return [...new Array(8)].map((arr, index) => (
        <Skeleton
          width="80%"
          height={80}
          animation="wave"
          style={{ margin: "0 auto" }}
          key={index}
        />
      ));

    return heThongRapChieu.map((system, index) => (
      <Grid item key={index}>
        <DetailTheaterSystem system={system} defaultChosen={index === 0} />
      </Grid>
    ));
  }, [detailMovie]);

  const getCumRapChieu = React.useCallback(() => {
    const heThongRapChieu = detailMovie.heThongRapChieu;
    if (!heThongRapChieu) return;
    const heThongRapChieuIndex = heThongRapChieu.findIndex(
      (system) => system.maHeThongRap === chosenTheaterSystem.maHeThongRap
    );
    const chosenHeThongRapChieu = heThongRapChieu[heThongRapChieuIndex];
    if (!chosenHeThongRapChieu) return;
    const cumRapChieu = chosenHeThongRapChieu.cumRapChieu;
    return cumRapChieu;
  }, [chosenTheaterSystem.maHeThongRap, detailMovie.heThongRapChieu]);

  const renderShowDateList = React.useCallback(() => {
    const showDateList = [];
    const cumRapChieu = getCumRapChieu();
    if (!cumRapChieu)
      return [...new Array(7)].map((arr, index) => (
        <Skeleton
          width={80}
          height={80}
          animation="wave"
          style={{ margin: "0 auto" }}
          key={index}
        />
      ));
    const cumRapChieuGroupByShowDate = groupShowDate(cumRapChieu);
    for (let showDate of cumRapChieuGroupByShowDate) {
      showDateList.push(showDate);
    }
    return showDateList.map((date, index) => (
      <Grid item key={index}>
        <ShowDate
          dayOfWeek={getDayOfWeek(new Date(date))}
          dayOfMonth={new Date(date).getDate()}
          month={new Date(date).getMonth() + 1}
          datetime={date}
          index={index}
        />
      </Grid>
    ));
  }, [getCumRapChieu]);

  const renderTheaterList = React.useCallback(() => {
    if (!chosenTheaterSystem) return;
    const cumRapChieu = getCumRapChieu();
    if (!cumRapChieu) return;
    const maCumRapList = cumRapChieu.map((rap) => rap.maCumRap);
    const lichChieuPhim = cumRapChieu.map((rap) => ({
      maCumRap: rap.maCumRap,
      lichChieu: rap.lichChieuPhim,
    }));
    const theaterListIndex = theaterList.findIndex(
      (theater) => theater.maHeThongRap === chosenTheaterSystem.maHeThongRap
    );
    if (!theaterList[theaterListIndex])
      return [...new Array(3)].map((arr, index) => (
        <Skeleton
          width="100%"
          height={100}
          animation="wave"
          style={{ margin: "0 auto" }}
          key={index}
        />
      ));
    const allTheaters = theaterList[theaterListIndex].theaters;
    const filteredTheaterList = allTheaters.filter((theater) =>
      maCumRapList.includes(theater.maCumRap)
    );
    filteredTheaterList.forEach((theater) => {
      delete theater.danhSachRap;
      lichChieuPhim.forEach((lich) => {
        if (lich.maCumRap === theater.maCumRap) {
          theater.lichChieuPhim = lich.lichChieu.filter(
            (item) => toDMY(item.ngayChieuGioChieu) === toDMY(detailShowDate)
          );
        }
      });
    });

    return filteredTheaterList
      .filter((theater) => theater.lichChieuPhim.length)
      .map((theater, index) => (
        <Grid item xs={12} key={index}>
          <DetailTheater
            theater={theater}
            lichChieuPhim={theater.lichChieuPhim}
          />
          <Divider className={classes.divider} />
        </Grid>
      ));
  }, [
    getCumRapChieu,
    theaterList,
    detailShowDate,
    classes.divider,
    chosenTheaterSystem,
  ]);

  React.useEffect(() => {
    if (!chosenTheaterSystem.maHeThongRap) return;
    dispatch(setTheaterList(chosenTheaterSystem.maHeThongRap));
  }, [dispatch, chosenTheaterSystem.maHeThongRap]);

  return (
    <Element name="lichChieu">
      <Grid container className={classes.root}>
        <Grid item xs={12} md={4} className={classes.left}>
          {renderTheaterSystem()}
        </Grid>
        <Grid item xs={12} md={8} className={classes.right}>
          <Grid item container className={classes.showDateList}>
            {renderShowDateList()}
          </Grid>
          <Grid item className={classes.theaters}>
            {renderTheaterList()}
          </Grid>
        </Grid>
      </Grid>
    </Element>
  );
};

export default Detail;

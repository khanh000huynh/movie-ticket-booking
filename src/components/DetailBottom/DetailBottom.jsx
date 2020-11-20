import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Detail from "../Detail/Detail";
import DetailMovieInformation from "../DetailMovieInformation/DetailMovieInformation";
import TabList from "../TabList/TabList";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "auto",
    position: "relative",
    backgroundImage:
      "linear-gradient(to bottom, #0A2029 0%, #08171e 50%, black 100%)",
  },
});

const DetailBottom = (props) => {
  const classes = useStyles();
  const movieInfo = useSelector((state) => state.movie.movieInfo);
  const maPhimFromUrl = React.useMemo(() => props.match.params.maPhim, [
    props.match.params.maPhim,
  ]);
  const hasShowtime = React.useMemo(
    () =>
      movieInfo &&
      movieInfo.isShowingList.length &&
      movieInfo.isShowingList.find((movie) => +movie.maPhim === +maPhimFromUrl),
    [movieInfo, maPhimFromUrl]
  );

  const tabList = React.useMemo(
    () => (hasShowtime ? ["LỊCH CHIẾU", "THÔNG TIN"] : ["THÔNG TIN"]),
    [hasShowtime]
  );
  const tabPanel1 = <Detail />;
  const tabPanel2 = <DetailMovieInformation />;
  const tabPanelList = React.useMemo(
    () => (hasShowtime ? [tabPanel1, tabPanel2] : [tabPanel2]),
    [hasShowtime, tabPanel1, tabPanel2]
  );

  return (
    <Grid container className={classes.root}>
      <TabList tabList={tabList} tabPanelList={tabPanelList} whiteColor />
    </Grid>
  );
};

export default withRouter(DetailBottom);

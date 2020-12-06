import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Detail from "../Detail/Detail";
import DetailMovieInformation from "../DetailMovieInformation/DetailMovieInformation";
import DetailRating from "../DetailRating/DetailRating";
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
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const hasShowtime = React.useMemo(() => {
    if (!detailMovie || !detailMovie.heThongRapChieu) return;
    return detailMovie.heThongRapChieu.length;
  }, [detailMovie]);
  const tabList = React.useMemo(
    () =>
      hasShowtime
        ? ["LỊCH CHIẾU", "THÔNG TIN", "ĐÁNH GIÁ"]
        : ["THÔNG TIN", "ĐÁNH GIÁ"],
    [hasShowtime]
  );
  const tabPanelLichChieu = <Detail />;
  const tabPanelThongTin = <DetailMovieInformation />;
  const tabPanelDanhGia = <DetailRating />;
  const tabPanelList = React.useMemo(
    () =>
      hasShowtime
        ? [tabPanelLichChieu, tabPanelThongTin, tabPanelDanhGia]
        : [tabPanelThongTin, tabPanelDanhGia],
    [hasShowtime, tabPanelLichChieu, tabPanelThongTin, tabPanelDanhGia]
  );

  return (
    <Grid container className={classes.root}>
      <TabList tabList={tabList} tabPanelList={tabPanelList} whiteColor />
    </Grid>
  );
};

export default withRouter(DetailBottom);

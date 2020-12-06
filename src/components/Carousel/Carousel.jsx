import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import theme from "../../theme/theme";
import Movie from "../Movie/Movie";
import Slide from "../Slide/Slide";
import { GlobalSlickCss } from "./global";

const useStyles = makeStyles({
  imgSlideMask: {
    backgroundColor: theme.palette.grey[300],
    height: 653,
    position: "relative",
    "& .MuiCircularProgress-root": {
      position: "absolute",
      top: "calc(50% - 35px)",
      left: "50%",
    },
  },
  movieSlideMask: {
    boxSizing: "border-box",
    width: "25%",
    height: 449.2,
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0.2, 1),
    "& > div": {
      height: "100%",
      backgroundColor: theme.palette.grey[300],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  circularProgress: {
    width: "auto",
    color: theme.palette.warning.main,
  },
  noMovie: {
    textAlign: "center",
    backgroundColor: theme.palette.grey[300],
    width: "100%",
    height: 450,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.warning.main,
    width: "100%",
    height: 450,
  },
});

const Carousel = (props) => {
  const classes = useStyles();
  const { data, slideType, settings } = props;
  const [customSettings, setCustomSettings] = React.useState(0);
  const [hasNoData, setHasNoData] = React.useState(null);

  const renderLoader = React.useCallback(() => {
    if (slideType === "img") {
      return (
        <Box className={classes.imgSlideMask}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </Box>
      );
    }
    if (slideType === "movie")
      return !hasNoData ? (
        <Box className={classes.loading}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </Box>
      ) : (
        <Box className={classes.noMovie}>Không có phim!</Box>
      );
  }, [
    slideType,
    hasNoData,
    classes.imgSlideMask,
    classes.circularProgress,
    classes.loading,
    classes.noMovie,
  ]);

  const renderSlides = React.useCallback(() => {
    return (
      data &&
      data.map((x, index) =>
        slideType === "img" ? (
          <Slide movie={x} key={index} />
        ) : (
          <Movie movie={x} key={index} index={index} />
        )
      )
    );
  }, [data, slideType]);

  React.useEffect(() => {
    if (!data) return;
    if (data.length <= 4 && slideType === "movie") {
      setCustomSettings({
        rows: 1,
        infinite: false,
      });
    } else if (slideType === "img") {
      setCustomSettings({
        rows: 1,
        infinite: true,
      });
    } else {
      setCustomSettings({
        rows: 2,
      });
    }
  }, [data, slideType]);

  React.useEffect(() => {
    setTimeout(() => {
      if (data && data.length === 0) {
        setHasNoData(true);
      }
    }, 3000);
  }, [data, classes.noMovie, classes.dNone]);

  return (
    <React.Fragment>
      <GlobalSlickCss />
      <Slider {...{ ...settings, ...customSettings }}>{renderSlides()}</Slider>
      {data && !data.length && renderLoader()}
    </React.Fragment>
  );
};

export default Carousel;

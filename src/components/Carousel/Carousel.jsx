import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import theme from "../../theme/theme";
import Movie from "../Movie/Movie";
import Slide from "../Slide/slide";
import { GlobalSlickCss } from "./global";

const useStyles = makeStyles({
  imgSlideMask: {
    backgroundColor: theme.palette.grey[300],
    height: 550,
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
});

const Carousel = (props) => {
  const classes = useStyles();
  const { data, slideType, settings } = props;
  const renderSlides = React.useCallback(() => {
    if (!data || !data.length)
      return slideType === "img" ? (
        <Box className={classes.imgSlideMask}>
          <CircularProgress
            className={classes.circularProgress}
            size={"5rem"}
          />
        </Box>
      ) : (
        [...new Array(8)].map((item, index) => (
          <Box className={classes.movieSlideMask} key={index}>
            <Box>
              <CircularProgress className={classes.circularProgress} />
            </Box>
          </Box>
        ))
      );

    return data.map((x, index) =>
      slideType === "img" ? (
        <Slide movie={x} key={index} />
      ) : (
        <Movie movie={x} key={index} index={index} />
      )
    );
  }, [
    data,
    slideType,
    classes.imgSlideMask,
    classes.movieSlideMask,
    classes.circularProgress,
  ]);

  return (
    <React.Fragment>
      <GlobalSlickCss />
      <Slider {...settings}>{renderSlides()}</Slider>
    </React.Fragment>
  );
};

export default Carousel;

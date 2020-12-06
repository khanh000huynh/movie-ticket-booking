import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import theme from "../../theme/theme";
import Trailer from "../Trailer/trailer";

const useStyles = makeStyles({
  root: {
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing(1.3),
    "&:hover": {
      "& $overlay": {
        backgroundColor: theme.palette.text.primary,
      },
      "& .MuiCardActionArea-focusHighlight": {
        backgroundColor: "transparent",
      },
      "& $age, $name, $time": {
        opacity: 0,
      },
      "& $trailer, $bookButton": {
        opacity: 1,
        zIndex: 1,
      },
    },
    "& *": {
      fontSize: "1rem",
    },
  },
  linkContent: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  content: {
    position: "relative",
    padding: theme.spacing(2, 0),
  },
  media: {
    height: 318,
    position: "relative",
    borderRadius: 4,
    backgroundColor: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      backgroundSize: "contain",
    },
  },
  age: {
    height: 22,
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontWeight: 500,
    borderRadius: 6,
    padding: theme.spacing(0, 0.5),
    marginRight: theme.spacing(1),
    transition: theme.transitions.duration,
  },
  name: {
    height: 43.2,
    fontWeight: 500,
    transition: theme.transitions.duration,
  },
  time: {
    fontSize: "0.8rem",
    color: theme.palette.grey[100],
    marginTop: theme.spacing(1),
    transition: theme.transitions.duration,
  },
  overlay: {
    cursor: "default",
    width: "100%",
    height: "100%",
    opacity: 0.5,
    transition: theme.transitions.duration,
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      opacity: 1,
    },
  },
  trailer: {
    opacity: 0,
    transition: theme.transitions.duration,
    [theme.breakpoints.down("sm")]: {
      opacity: 1,
    },
    "& > div": {
      width: 50,
      height: 50,
    },
  },
  rating: {
    borderRadius: 4,
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    backgroundColor: "rgba(12,27,54,.8)",
    color: theme.palette.common.white,
    textAlign: "center",
    fontSize: "0.3rem",
    width: 54.5,
    "& .MuiRating-root": {
      color: theme.palette.warning.main,
      "& .MuiSvgIcon-root": {
        width: "0.5em",
        height: "0.5em",
      },
    },
  },
  halfRating: {
    fontSize: "0.8rem",
    color: theme.palette.warning.main,
  },
  bookButton: {
    width: "100%",
    height: 45,
    margin: theme.spacing(3, 0),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    borderRadius: 4,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.warning[100],
    },
  },
});

const Movie = (props) => {
  const classes = useStyles();
  const { movie } = props;
  const { maPhim, tenPhim, trailer, hinhAnh } = movie;
  const movieRating = useSelector((state) => state.movie.movieRating);
  const diem = React.useMemo(() => {
    if (!movie || !movieRating) return;
    const index = movieRating.findIndex((item) => item.maPhim === maPhim);
    let result = 0;
    if (index !== -1) {
      result = (
        movieRating[index].danhGia
          .map((item) => item.diem)
          .reduce((prev, current) => prev + current) /
        movieRating[index].danhGia.length
      ).toFixed(1);
    }
    return result;
  }, [movie, movieRating, maPhim]);

  return (
    <>
      {maPhim && (
        <Card elevation={0} className={classes.root}>
          <CardActionArea disableRipple>
            <CardMedia className={classes.media} image={hinhAnh}>
              <Box className={classes.overlay} />
              <Box className={classes.trailer}>
                <Trailer trailer={trailer} />
              </Box>
              <Box className={classes.rating}>
                <Typography>{diem}</Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Rating
                    value={diem / 2}
                    max={Math.floor(diem / 2)}
                    precision={1}
                    readOnly
                  />
                  {diem ? (
                    <Typography className={classes.halfRating}>
                      &frac12;
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </CardMedia>

            <Link to={`/phim/${maPhim}`} className={classes.linkContent}>
              <CardContent className={classes.content}>
                <Box display="flex">
                  <Typography component="span" className={classes.age}>
                    C18
                  </Typography>
                  <Typography className={classes.name}>
                    {tenPhim.length >= 35
                      ? tenPhim.substr(0, 35) + "..."
                      : tenPhim}
                  </Typography>
                </Box>
                <Typography className={classes.time} component="p">
                  {120 | 0}&nbsp;phút
                </Typography>
                <Box className={classes.bookButton}>XEM THÔNG TIN</Box>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default withRouter(Movie);

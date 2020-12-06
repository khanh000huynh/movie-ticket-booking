import {
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";
import { setDetailMovieRating } from "../../redux/actions/detailActions";
import theme from "../../theme/theme";
import { toDMY } from "../../utils/showDate";
import Trailer from "../Trailer/trailer";

const useStyles = makeStyles({
  root: {
    fontSize: "0.875rem",
    position: "relative",
    color: theme.palette.common.white,
    height: 580,
    [theme.breakpoints.down("md")]: {
      height: 800,
    },
  },
  background: {
    width: "100%",
    height: "100%",
    filter: "blur(15px)",
    WebkitFilter: "blur(15px)",
  },
  thingsOnBackground: {
    position: "absolute",
    width: "65%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      "& $rating": {
        justifyContent: "flex-end",
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      "& $media": {
        width: "100%",
        height: 288,
      },
    },
  },
  media: {
    width: 217.5,
    height: 321.69,
    borderRadius: 4,
    boxShadow: "5px 5px 20px " + theme.palette.grey[200],
    position: "relative",
    "&:hover": {
      "& $trailer": {
        opacity: 1,
      },
    },
  },
  trailer: {
    opacity: 0,
    transition: theme.transitions.duration,
    [theme.breakpoints.down("xs")]: {
      opacity: 1,
    },
    "& > div": {
      width: 50,
      height: 50,
    },
  },
  age: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontSize: "1rem",
    fontWeight: 500,
    borderRadius: 6,
    padding: theme.spacing(0, 0.5),
    marginRight: theme.spacing(1),
    opacity: 1,
    transition: theme.transitions.duration,
  },
  description: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  text: {
    textShadow: "2px 2px 8px " + theme.palette.grey[200],
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(2),
    },
  },
  bookButton: {
    width: 104.18,
    padding: theme.spacing(1, 3),
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    borderRadius: 4,
    boxShadow: "2px 2px 8px " + theme.palette.grey[200],
    transition: theme.transitions.duration,
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.warning[100],
    },
  },
  circle: {
    width: 126,
    height: 126,
    backgroundColor: theme.palette.grey[200],
    borderRadius: "50%",
    margin: "0 auto",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    "&::after": {
      content: "''",
      width: 115,
      height: 115,
      border: "11px solid " + theme.palette.success[100],
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  rating: {
    alignItems: "center",
    textAlign: "center",
    padding: 0,
    margin: 0,
    textShadow: "2px 2px 8px " + theme.palette.grey[200],
    "& .MuiRating-root": {
      color: theme.palette.warning.main,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  halfRating: {
    fontSize: "1.5rem",
    color: theme.palette.warning.main,
  },
});

const DetailTop = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const {
    hinhAnh,
    heThongRapChieu,
    ngayKhoiChieu,
    maPhim,
    tenPhim,
    trailer,
  } = detailMovie;
  const thoiLuong = React.useMemo(() => {
    return !heThongRapChieu ||
      !heThongRapChieu[0] ||
      !heThongRapChieu[0].cumRapChieu
      ? 0
      : heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong;
  }, [heThongRapChieu]);
  const [ratingValue, setRatingValue] = React.useState(0);
  const detailMovieRating = useSelector(
    (state) => state.detail.detailMovieRating
  );
  const diem = React.useMemo(() => {
    if (
      !detailMovieRating ||
      !detailMovieRating.danhGia ||
      !detailMovieRating.danhGia.length
    )
      return;
    let result = 0;
    result = Math.round(
      detailMovieRating.danhGia
        .map((item) => item.diem)
        .reduce((prev, current) => prev + current) /
        detailMovieRating.danhGia.length
    );
    return result;
  }, [detailMovieRating]);

  const handleBookTickets = () => {
    sessionStorage.setItem("sectionId", "lichChieu");
  };

  React.useEffect(() => {
    if (diem) setRatingValue(diem);
  }, [diem]);

  React.useEffect(() => {
    maPhim && dispatch(setDetailMovieRating(maPhim));
  }, [maPhim, dispatch]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs>
        {hinhAnh ? (
          <CardMedia image={hinhAnh} className={classes.background} />
        ) : (
          <Skeleton variant="rect" width="100%" height="100%" />
        )}
      </Grid>
      <Grid item container className={classes.thingsOnBackground}>
        <Grid item container alignItems="center" xs={12} sm={8} md={9}>
          {hinhAnh ? (
            <CardMedia image={hinhAnh} className={classes.media}>
              <div className={classes.trailer}>
                <Trailer trailer={trailer} />
              </div>
            </CardMedia>
          ) : (
            <CircularProgress style={{ color: theme.palette.warning.main }} />
          )}
          <Box className={classes.text}>
            <Typography>{toDMY(ngayKhoiChieu)}</Typography>
            <Typography component="span" className={classes.age}>
              C18
            </Typography>
            <Typography component="span" className={classes.description}>
              {tenPhim}
            </Typography>
            <Typography component="p">{thoiLuong + " phút"}</Typography>
            {heThongRapChieu && heThongRapChieu.length ? (
              <Box pt={4}>
                <Link
                  to="lichChieu"
                  id="lichChieuLink"
                  offset={-64}
                  smooth
                  duration={500}
                  onClick={handleBookTickets}
                  className={classes.bookButton}
                >
                  MUA VÉ
                </Link>
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          xs={12}
          sm={4}
          md={3}
          className={classes.rating}
        >
          <Box>
            <Box className={classes.circle}>{ratingValue}</Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              my={2}
            >
              <Rating
                value={ratingValue / 2}
                max={Math.floor(ratingValue / 2)}
                precision={0.5}
                readOnly
              />
              <Typography className={classes.halfRating}>
                &nbsp;&frac12;
              </Typography>
            </Box>
            <Typography>
              {detailMovieRating &&
                detailMovieRating.danhGia &&
                detailMovieRating.danhGia.length}{" "}
              người đánh giá
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailTop;

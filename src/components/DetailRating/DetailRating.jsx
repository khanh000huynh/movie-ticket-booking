import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setDetailMovieRating } from "../../redux/actions/detailActions";
import theme from "../../theme/theme";
import DetailRatingBottom from "./DetailRatingBottom";
import DetailRatingTop from "./DetailRatingTop";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    marginBottom: theme.spacing(6),
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
    "& .MuiRating-root": {
      color: theme.palette.warning.main,
    },
  },
  readMoreButton: {
    textAlign: "center",
    marginTop: theme.spacing(6),
    "& > button": {
      backgroundColor: "transparent",
      border: "1px solid " + theme.palette.grey[150],
      borderRadius: 4,
      color: theme.palette.grey[150],
      fontWeight: 400,
      textAlign: "center",
      padding: theme.spacing(0.5, 2),
      transition: theme.transitions.duration,
      "&:hover": {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.common.white,
        transition: theme.transitions.duration,
      },
    },
  },
});

const DetailRating = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credentials);
  const detailMovieRating = useSelector(
    (state) => state.detail.detailMovieRating
  );
  const [limit, setLimit] = React.useState(2);
  const danhGia = React.useMemo(() => {
    if (!user.taiKhoan) return detailMovieRating.danhGia;
    if (!detailMovieRating || !detailMovieRating.danhGia) return;
    const myOwnRatingIndex = detailMovieRating.danhGia.findIndex(
      (rating, index) => rating.taiKhoan === user.taiKhoan
    );
    if (myOwnRatingIndex !== -1) {
      const temp = detailMovieRating.danhGia[0];
      detailMovieRating.danhGia[0] =
        detailMovieRating.danhGia[myOwnRatingIndex];
      detailMovieRating.danhGia[myOwnRatingIndex] = temp;
    }
    return detailMovieRating.danhGia.filter((rating, index) => index < limit);
  }, [user, detailMovieRating, limit]);

  const handleSeeMore = React.useCallback(() => {
    setLimit(limit + 2);
  }, [limit]);

  const getMyOwnRating = React.useCallback(
    (index) =>
      detailMovieRating &&
      detailMovieRating.danhGia
        .map((rating) => rating.taiKhoan)
        .includes(user.taiKhoan) &&
      index === 0
        ? true
        : false,
    [detailMovieRating, user.taiKhoan]
  );

  const renderDetailRatingBottom = React.useCallback(() => {
    if (!detailMovieRating || !detailMovieRating.danhGia) return;
    return danhGia.map((item, index) => (
      <DetailRatingBottom
        key={index}
        {...item}
        myOwnRating={getMyOwnRating(index)}
      />
    ));
  }, [detailMovieRating, danhGia, getMyOwnRating]);

  React.useEffect(() => {
    dispatch(setDetailMovieRating(props.match.params.maPhim));
  }, [dispatch, props.match.params.maPhim]);

  return (
    <Box className={classes.root}>
      <DetailRatingTop />
      {renderDetailRatingBottom()}
      {detailMovieRating &&
        detailMovieRating.danhGia &&
        detailMovieRating.danhGia.length > 2 && (
          <Box className={classes.readMoreButton}>
            <Button onClick={handleSeeMore}>XEM THÊM</Button>
          </Box>
        )}
    </Box>
  );
};

export default withRouter(DetailRating);

import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ThumbUpRounded } from "@material-ui/icons";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import { Rating } from "@material-ui/lab";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailMovieRatingLikes,
  setDetailMovieRatingLikesMockApi,
} from "../../redux/actions/detailActions";
import theme from "../../theme/theme";
import { calculateTimeDifference } from "../../utils/timeDifference";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 2),
    "& > div:nth-child(2) > div:first-child": {
      textAlign: "center",
      "& > div:nth-child(1)": {
        color: theme.palette.success.main,
      },
      "& > div:nth-child(2) span": {
        fontSize: "0.625rem",
        color: theme.palette.warning.main,
      },
      "& p": {
        fontWeight: "bold",
      },
    },
    "& > div:nth-child(3)": {
      margin: theme.spacing(2.5, 0),
    },
  },
  myOwnRating: {
    backgroundColor: "#f7fcff",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  avatarText: {
    "& > p:nth-child(1)": {
      fontWeight: 500,
    },
    "& > p:nth-child(2)": {
      color: theme.palette.grey[50],
      fontSize: "0.625rem",
    },
  },
  theirRating: {
    width: "auto",
  },
  readMore: {
    color: theme.palette.warning.main,
    cursor: "pointer",
  },
  likes: {
    alignItems: "center",
    color: theme.palette.grey[150],
    cursor: "pointer",
    display: "flex",
    marginTop: theme.spacing(1),
    width: "fit-content",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    "& svg": {
      marginRight: theme.spacing(0.5),
      width: "0.7em",
      height: "0.7em",
    },
    "& > p": {
      fontWeight: "bold",
    },
  },
  "@keyframes liked": {
    "50%": {
      transform: "rotate(-40deg)",
    },
    "100%": {
      transform: "rotate(0)",
    },
  },
  liked: {
    color: theme.palette.primary.main,
    "& > svg": {
      animation: "$liked 0.5s",
    },
  },
  loader: {
    width: "100%",
    height: 146.6,
    backgroundColor: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    "& svg": {
      color: theme.palette.warning.main,
    },
  },
});

const DetailRatingBottom = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    myOwnRating,
    taiKhoan,
    hoTen,
    avatar,
    binhLuan,
    diem,
    ngayGioDanhGia,
  } = props;
  const detailMovieRating = useSelector(
    (state) => state.detail.detailMovieRating
  );
  const detailMovieRatingLikes = useSelector(
    (state) => state.detail.detailMovieRatingLikes
  );
  const user = useSelector((state) => state.user.credentials);
  const taiKhoanThich = React.useMemo(() => {
    if (!detailMovieRatingLikes) return;
    const result = detailMovieRatingLikes.find(
      (rating) => rating.taiKhoan === taiKhoan
    );
    return result ? result.taiKhoanThich : [];
  }, [detailMovieRatingLikes, taiKhoan]);
  const [cloneLuotThich, setCloneLuotThich] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showComment, setShowComment] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [currentDatetime, setCurrentDatetime] = React.useState(new Date());
  const [likeTimeout, setLikeTimeout] = React.useState(null);
  const letterAvatar = React.useMemo(() => {
    if (!avatar && hoTen) return hoTen.charAt(0);
    return null;
  }, [avatar, hoTen]);
  const ratingDatetimeDifference = React.useMemo(() => {
    if (!ngayGioDanhGia) return;
    return calculateTimeDifference(new Date(ngayGioDanhGia), currentDatetime);
  }, [ngayGioDanhGia, currentDatetime]);

  const handleReadMore = React.useCallback(() => {
    setShowComment(!showComment);
  }, [showComment]);

  const handleLike = React.useCallback(
    async (event) => {
      if (!detailMovieRating || !user) {
        event.preventDefault();
        return;
      }
      setLiked(!liked);
      if (likeTimeout) clearTimeout(likeTimeout);
      if (liked) setCloneLuotThich(cloneLuotThich - 1);
      else setCloneLuotThich(cloneLuotThich + 1);

      // const taiKhoanIndex =
      //   taiKhoanThich && taiKhoanThich.length
      //     ? taiKhoanThich.findIndex((item) => item === taiKhoan)
      //     : null;
      // console.log(taiKhoanIndex);

      setLikeTimeout(() => {
        dispatch(
          setDetailMovieRatingLikesMockApi(
            detailMovieRating.maPhim,
            taiKhoan,
            user.taiKhoan
          )
        );
      }, 1000);
    },
    [
      detailMovieRating,
      user,
      liked,
      likeTimeout,
      cloneLuotThich,
      dispatch,
      taiKhoan,
    ]
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDatetime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (!taiKhoan || !detailMovieRating) return;
    dispatch(setDetailMovieRatingLikes(taiKhoan, detailMovieRating.maPhim));
  }, [taiKhoan, detailMovieRating, dispatch]);

  React.useEffect(() => {
    if (!taiKhoanThich || !user) return;
    if (taiKhoanThich.includes(user.taiKhoan)) setLiked(true);
  }, [taiKhoanThich, user]);

  React.useEffect(() => {
    if (!taiKhoanThich) return;
    setCloneLuotThich(taiKhoanThich.length);
  }, [taiKhoanThich]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoading ? (
        <Grid
          container
          className={classnames(
            classes.root,
            myOwnRating ? classes.myOwnRating : ""
          )}
        >
          <Grid item container alignItems="center" justify="flex-start" xs={6}>
            <Avatar
              alt="avatar"
              src={avatar ? avatar : ""}
              className={classes.avatar}
            >
              {avatar ? avatar : letterAvatar}
            </Avatar>
            <Box className={classes.avatarText}>
              <Typography>{hoTen}</Typography>
              <Typography>{ratingDatetimeDifference}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} container alignItems="center" justify="flex-end">
            <Grid container className={classes.theirRating}>
              <Grid item container alignItems="center" justify="center" xs={12}>
                <Typography>{diem}</Typography>
              </Grid>
              <Grid item container alignItems="center" justify="center" xs={12}>
                <Rating
                  name="disabled"
                  value={diem / 2}
                  max={Math.floor(diem / 2)}
                  precision={0.5}
                  disabled
                />
                <Typography component="span">&frac12;</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {binhLuan && binhLuan.length >= 200 && !showComment
                ? binhLuan.substr(0, 200) + "..."
                : binhLuan}
            </Typography>
            {binhLuan && binhLuan.length >= 200 && (
              <Link
                component="a"
                className={classes.readMore}
                onClick={handleReadMore}
              >
                {showComment ? "Ẩn bớt" : "Xem thêm"}
              </Link>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Box
              className={classnames(classes.likes, liked ? classes.liked : "")}
              onClick={handleLike}
            >
              {liked ? <ThumbUpRounded /> : <ThumbUpOutlinedIcon />}
              <Typography>
                <b>{cloneLuotThich || 0}</b> Thích
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box className={classes.loader}>
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
};

export default DetailRatingBottom;

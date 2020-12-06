import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { Rating } from "@material-ui/lab";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { MovieRatingSchema } from "../../formik/schema";
import { DanhGia } from "../../models/DanhGia";
import { setDelayTask } from "../../redux/actions/delayTaskActions";
import { setDetailMovieRatingMockApi } from "../../redux/actions/detailActions";
import { setMessageBox } from "../../redux/actions/pageAction";
import theme from "../../theme/theme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import HoverRating from "../HoverRating/HoverRating";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    cursor: "pointer",
    padding: theme.spacing(1, 2),
  },
  avatar: {
    marginRight: theme.spacing(1.5),
  },
  modal: {
    backgroundColor: theme.palette.common.white,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    position: "absolute",
    width: "50%",
    height: "auto",
    padding: theme.spacing(3),
    "& > form > div > div:nth-child(2)": {
      margin: theme.spacing(3, 0),
      "& textarea": {
        border: "1px solid " + theme.palette.grey[100],
        boxSizing: "border-box",
        width: "100%",
        height: 100,
        fontFamily: "Roboto",
        marginTop: theme.spacing(1),
        padding: theme.spacing(1.5),
        "&::placeholder": {
          color: theme.palette.grey[250],
        },
      },
    },
    "& button": {
      backgroundColor: theme.palette.warning.main,
      borderRadius: 4,
      color: theme.palette.common.white,
      fontWeight: 400,
      textAlign: "center",
      padding: theme.spacing(0.5, 2),
      transition: theme.transitions.duration,
      "&:hover": {
        backgroundColor: theme.palette.warning.dark,
        transition: theme.transitions.duration,
      },
    },
  },
  paperInsider: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& > svg": {
      width: 30,
      height: 30,
      cursor: "pointer",
      position: "absolute",
      top: 0,
      right: 0,
    },
  },
  accountCircle: {
    color: theme.palette.grey[50],
    width: 40,
    height: 40,
  },
});

const DetailRatingTop = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [ratingPoint, setRatingPoint] = React.useState(5);
  const formRef = React.useRef();
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const messageBoxFromReduxStore = useSelector(
    (state) => state.page.messageBox
  );
  const detailMovieRating = useSelector(
    (state) => state.detail.detailMovieRating
  );
  const user = useSelector((state) => state.user.credentials);
  const hasRated = React.useMemo(() => {
    if (!detailMovieRating || !detailMovieRating.danhGia || !user.taiKhoan)
      return;
    const myRatingIndex = detailMovieRating.danhGia.findIndex(
      (rating) => rating.taiKhoan === user.taiKhoan
    );
    if (myRatingIndex !== -1) return true;
    return false;
  }, [detailMovieRating, user.taiKhoan]);
  const yesOrNo = React.useMemo(() => {
    if (!messageBoxFromReduxStore) return;
    return messageBoxFromReduxStore.yesOrNo;
  }, [messageBoxFromReduxStore]);
  const letterAvatar = React.useMemo(() => {
    if (!user || !user.hoTen) return null;
    return user.hoTen.charAt(0);
  }, [user]);

  const getRatingPoint = React.useCallback((point) => {
    setRatingPoint(point);
  }, []);

  const handleOpen = React.useCallback(() => {
    if (!user || !user.accessToken) {
      dispatch(
        setDelayTask({
          destination: props.location.pathname,
        })
      );
      dispatch(
        setMessageBox({
          isOpened: true,
          message: "Bạn cần đăng nhập trước!",
          type: "info",
        })
      );
      return;
    }
    setOpen(true);
  }, [user, dispatch, props.location.pathname]);

  const handleClose = React.useCallback(() => {
    if (formRef.current.values.comment.length) {
      dispatch(
        setMessageBox({
          isOpened: true,
          message: "Bình luận chưa được đăng, đóng cửa sổ?",
          type: "confirm",
        })
      );
    } else setOpen(false);
  }, [dispatch]);

  const handleRating = React.useCallback(
    (values) => {
      if (!user) return;
      const danhGia = DanhGia(
        user.taiKhoan,
        user.hoTen,
        user.picture || "",
        values.comment,
        ratingPoint,
        new Date().toString()
      );
      dispatch(
        setDetailMovieRatingMockApi({
          maPhim: detailMovie.maPhim,
          tenPhim: detailMovie.tenPhim,
          danhGia,
        })
      );
      setOpen(false);
    },
    [ratingPoint, user, dispatch, detailMovie]
  );

  const body = React.useMemo(() => {
    return (
      <Paper className={classes.modal}>
        <Formik
          innerRef={formRef}
          initialValues={{ ratingPoint, comment: "" }}
          onSubmit={handleRating}
          validationSchema={MovieRatingSchema}
        >
          {({ errors, touched, values, isValid }) => (
            <Form className={classes.paperInsider} spellCheck="false">
              <CloseIcon onClick={handleClose} />
              <Grid container>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={12}
                >
                  <HoverRating getRatingPoint={getRatingPoint} />
                </Grid>
                <Grid item xs={12}>
                  {errors.comment && touched.comment ? (
                    <ErrorMessage message={errors.comment} />
                  ) : (
                    <Box height={17} />
                  )}
                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Chia sẻ cảm nhận của bạn..."
                  />
                </Grid>
                <Grid item xs={12} container justify="flex-end">
                  <Button type="submit" disabled={!values.comment || !isValid}>
                    ĐĂNG
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    );
  }, [
    classes.modal,
    ratingPoint,
    handleRating,
    classes.paperInsider,
    handleClose,
    getRatingPoint,
  ]);

  React.useEffect(() => {
    if (yesOrNo === "yes") setOpen(false);
  }, [yesOrNo]);

  return (
    <>
      {!hasRated && (
        <>
          <Grid container className={classes.root} onClick={handleOpen}>
            <Grid
              item
              container
              alignItems="center"
              justify="flex-start"
              xs={6}
            >
              {user.taiKhoan ? (
                <Avatar
                  alt="avatar"
                  src={user.picture ? user.picture : ""}
                  className={classes.avatar}
                >
                  {user.picture ? user.picture : letterAvatar}
                </Avatar>
              ) : (
                <AccountCircleOutlined className={classes.accountCircle} />
              )}
              <Typography>Bạn nghĩ gì về phim này?</Typography>
            </Grid>
            <Grid item container alignItems="center" justify="flex-end" xs={6}>
              <Rating name="disabled" value={5} disabled />
            </Grid>
          </Grid>
          <Modal open={open}>{body}</Modal>
        </>
      )}
    </>
  );
};

export default withRouter(DetailRatingTop);

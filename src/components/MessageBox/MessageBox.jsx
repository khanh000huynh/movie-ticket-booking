import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setMessageBox } from "../../redux/actions/pageAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "5px dashed " + theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    outline: "none",
    padding: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.warning.main,
    textTransform: "uppercase",
    borderBottom: "1px dashed " + theme.palette.text.primary,
    paddingBottom: theme.spacing(2),
  },
  message: {
    margin: theme.spacing(2, 0),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& > button:nth-child(1)": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    "& > button:nth-child(2)": {
      backgroundColor: theme.palette.grey[250],
      marginLeft: theme.spacing(1),
      transition: theme.transitions.duration,
      "&:hover": {
        opacity: 0.5,
        transition: theme.transitions.duration,
      },
    },
  },
}));

const MessageBox = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { message, type } = props;
  const messageBoxFromReduxStore = useSelector(
    (state) => state.page.messageBox
  );
  const open = React.useMemo(() => {
    if (!messageBoxFromReduxStore) return;
    return messageBoxFromReduxStore.isOpened;
  }, [messageBoxFromReduxStore]);
  const delayTask = useSelector((state) => state.delayTask);

  const handleClose = React.useCallback(() => {
    if (type === "confirm")
      dispatch(
        setMessageBox({
          isOpened: false,
          message,
          type,
          yesOrNo: "yes",
        })
      );
    else dispatch(setMessageBox(null));
  }, [dispatch, message, type]);

  const handleRedirectToLogInPage = React.useCallback(() => {
    props.history.push("/dangnhap");
    dispatch(setMessageBox(null));
  }, [props.history, dispatch]);

  const iconByMessageType = React.useMemo(() => {
    if (type === "info") return <InfoOutlinedIcon style={{ color: "black" }} />;
    if (type === "success")
      return <CheckCircleOutlineRoundedIcon style={{ color: "green" }} />;
    if (type === "confirm")
      return <HelpOutlineOutlinedIcon style={{ color: "black" }} />;
    if (type === "warning")
      return <ReportProblemOutlinedIcon style={{ color: "orange" }} />;
    return <ErrorOutlineOutlinedIcon style={{ color: "red" }} />;
  }, [type]);

  const messageTitleByMessageType = React.useMemo(() => {
    if (type === "info" || type === "success") return "Thông báo";
    if (type === "confirm") return "Xác nhận";
    if (type === "warning") return "Cảnh báo";
    return "Lỗi";
  }, [type]);

  const body = React.useMemo(
    () => (
      <Box className={classes.paper}>
        <Box className={classes.title}>
          {iconByMessageType}
          <Typography>&nbsp;&nbsp;{messageTitleByMessageType}</Typography>
        </Box>
        <Typography className={classes.message}>{message}</Typography>
        <Box className={classes.buttons}>
          <Button
            onClick={
              delayTask.destination &&
              delayTask.destination.length &&
              delayTask.destination.search(/phim/g) !== -1
                ? handleRedirectToLogInPage
                : handleClose
            }
          >
            OK
          </Button>
          {type === "confirm" && (
            <Button
              onClick={() => {
                dispatch(
                  setMessageBox({
                    isOpened: false,
                    message,
                    type,
                    yesOrNo: "no",
                  })
                );
              }}
            >
              Hủy
            </Button>
          )}
        </Box>
      </Box>
    ),
    [
      classes.paper,
      classes.title,
      iconByMessageType,
      messageTitleByMessageType,
      classes.message,
      classes.buttons,
      delayTask,
      handleClose,
      handleRedirectToLogInPage,
      dispatch,
      message,
      type,
    ]
  );

  React.useEffect(() => {
    window.addEventListener("keyup", (event) => {
      if (event.key === "Enter") handleClose();
    });
  }, [handleClose]);

  return (
    <>
      <Modal
        open={open || false}
        onClose={type === "confirm" ? null : handleClose}
      >
        {body}
      </Modal>
    </>
  );
};

export default withRouter(MessageBox);

import { Box, makeStyles } from "@material-ui/core";
import WeekendRoundedIcon from "@material-ui/icons/WeekendRounded";
import classnames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { setChosenChairList } from "../../redux/actions/ticketBookingActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.white,
    position: "relative",
    border: "none",
    outline: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: 20,
      height: 20,
    },
    "&:hover": {
      backgroundColor: "inherit",
    },
    "& .MuiButton-label": {
      width: "100%",
      height: "100%",
    },
  },
  chair: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  normalChair: {
    color: "#3E515D",
  },
  vipChair: {
    color: "#F7B500",
  },
  isChosen: {
    color: theme.palette.success[150],
  },
  bookedChair: {
    color: theme.palette.grey[250],
    cursor: "not-allowed",
  },
  chairNumber: {
    position: "absolute",
    top: "44%",
    left: "50%",
    color: theme.palette.text.primary,
    transform: "translate(-50%, -50%)",
    WebkitTransform: "translate(-50%, -50%)",
    cursor: "pointer",
    fontWeight: "bold",
  },
});

const Chair = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { chair, chosenChairList } = props;
  const { tenGhe, loaiGhe, daDat, taiKhoanNguoiDat } = chair;
  const [isChosen, setIschosen] = React.useState(false);

  const handleChooseChairs = React.useCallback(() => {
    if (
      (daDat && taiKhoanNguoiDat) ||
      (chosenChairList.length === 10 && !isChosen)
    ) {
      alert("Bạn không thể chọn quá 10 ghế!");
      return;
    }
    dispatch(setChosenChairList(chair));
    setIschosen(!isChosen);
  }, [
    daDat,
    taiKhoanNguoiDat,
    chosenChairList.length,
    dispatch,
    chair,
    isChosen,
  ]);

  return (
    <button
      onClick={handleChooseChairs}
      className={classes.root}
      disabled={daDat && taiKhoanNguoiDat}
    >
      <WeekendRoundedIcon
        className={classnames(
          classes.chair,
          loaiGhe === "Thuong" ? classes.normalChair : classes.vipChair,
          isChosen ? classes.isChosen : "",
          daDat && taiKhoanNguoiDat ? classes.bookedChair : ""
        )}
      />
      {isChosen && <Box className={classes.chairNumber}>{tenGhe}</Box>}
    </button>
  );
};

export default Chair;

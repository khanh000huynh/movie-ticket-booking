import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { withRouter } from "react-router-dom";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  bookingInfo: {
    padding: theme.spacing(2, 4),
  },
  backToHomeButton: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    textTransform: "none",
    marginLeft: theme.spacing(4),
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
});

const BookingResult = (props) => {
  const classes = useStyles();
  const savedBookingInfo = JSON.parse(
    sessionStorage.getItem("savedBookingInfo")
  );
  const { movieInfo, chosenChairList, totalAmount } = savedBookingInfo;
  const { tenPhim, tenCumRap, ngayChieu, gioChieu, tenRap } = movieInfo;

  const renderChosenChairList = React.useCallback(() => {
    return chosenChairList.map((chair) => chair.tenGhe).join(", ");
  }, [chosenChairList]);

  const handleRedirectToHomePage = React.useCallback(() => {
    sessionStorage.clear();
    props.history.replace("/");
  }, [props.history]);

  return (
    <Box>
      <Alert severity="success">Đặt vé thành công!</Alert>
      <Box className={classes.bookingInfo}>
        <Typography>
          <b>Tên phim</b>: {tenPhim}
        </Typography>
        <Typography>
          <b>Cụm rạp:</b> {tenCumRap}
        </Typography>
        <Typography>
          <b>Ngày chiếu:</b> {ngayChieu}
        </Typography>
        <Typography>
          <b>Giờ chiếu:</b> {gioChieu}
        </Typography>
        <Typography>
          <b>Rạp:</b> {tenRap}
        </Typography>
        <Typography>
          <b>Ghế đã đặt:</b> {renderChosenChairList()}
        </Typography>
        <Typography>
          <b>Tổng tiền:</b> {totalAmount} đ
        </Typography>
      </Box>
      <Button
        className={classes.backToHomeButton}
        onClick={handleRedirectToHomePage}
      >
        Về trang chủ
      </Button>
    </Box>
  );
};

export default withRouter(BookingResult);

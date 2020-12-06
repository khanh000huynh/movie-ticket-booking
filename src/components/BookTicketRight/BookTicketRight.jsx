import {
  Box,
  Button,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import zalopay from "../../assets/img/zalopay.png";
import connector from "../../configs/connector";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    minHeight: 620,
    padding: theme.spacing(2, 4),
    "& *": {
      fontSize: "0.875rem",
    },
    "& .MuiIconButton-label": {
      color: theme.palette.warning.main,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  grayText: {
    color: theme.palette.grey[150],
    fontWeight: 500,
  },
  totalAmount: {
    fontSize: "2.3rem",
    fontWeight: 500,
    color: theme.palette.success.main,
    borderBottom: "1px dashed " + theme.palette.grey[100],
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  theaterInfo: {
    padding: theme.spacing(1.5, 0),
    borderBottom: "1px dashed " + theme.palette.grey[100],
  },
  age: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontWeight: 500,
    borderRadius: 6,
    padding: theme.spacing(0, 0.5),
    marginRight: theme.spacing(1),
  },
  chairInfo: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 0),
    borderBottom: "1px dashed " + theme.palette.grey[100],
    "& p:first-child": {
      color: theme.palette.warning.main,
      fontWeight: 500,
    },
    "& p:nth-child(2)": {
      color: theme.palette.success.main,
      fontWeight: 500,
    },
  },
  input: {
    padding: theme.spacing(1.5, 0),
    borderBottom: "1px dashed " + theme.palette.grey[100],
    "& *": {
      fontSize: "0.75rem",
    },
    "& input": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      width: "100%",
      fontSize: "0.8rem",
      fontWeight: 500,
      "&::placeholder": {
        color: theme.palette.text.primary,
      },
    },
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
  },
  icons: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1),
  },
  payment: {
    padding: theme.spacing(1.5, 0),
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    "& legend:first-child": {
      marginBottom: theme.spacing(1.5),
    },
  },
  bookButton: {
    width: "100%",
    height: 50,
    backgroundColor: theme.palette.success.main,
    transition: theme.transitions.duration,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.success[150],
      color: theme.palette.text.primary,
    },
  },
});

const BookTicketRight = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { movieInfo, chosenChairList } = props;
  const { tenPhim, tenCumRap, ngayChieu, gioChieu, tenRap } = movieInfo;
  const user = useSelector((state) => state.user.credentials);
  const [payment, setPayment] = React.useState("zalopay");
  const [bookingInfo, setBookingInfo] = React.useState({
    maLichChieu: 0,
    danhSachVe: [],
    taiKhoanNguoiDung: "",
  });
  const totalAmount = React.useMemo(() => {
    if (!chosenChairList.length) return 0;
    const priceList = chosenChairList.map((chair) => chair.giaVe);
    return Intl.NumberFormat().format(
      Math.round(
        priceList.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      )
    );
  }, [chosenChairList]);
  const isValid = React.useMemo(() => {
    const { maLichChieu, danhSachVe, taiKhoanNguoiDung } = bookingInfo;
    if (!maLichChieu || !danhSachVe.length || !taiKhoanNguoiDung) return false;
    return true;
  }, [bookingInfo]);

  const renderChosenChairList = React.useCallback(() => {
    return chosenChairList.map((chair) => chair.tenGhe).join(", ");
  }, [chosenChairList]);

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!isValid) return;

      dispatch(() => {
        connector({
          url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
          method: "POST",
          data: bookingInfo,
        })
          .then((res) => {
            if (res.status === 200) {
              sessionStorage.setItem(
                "savedBookingInfo",
                JSON.stringify({
                  movieInfo,
                  chosenChairList,
                  totalAmount,
                })
              );
              props.history.replace(
                `/muave/ketqua/${props.match.params.maLichChieu}`
              );
            }
          })
          .catch((err) => console.log(err));
      });
    },
    [
      isValid,
      dispatch,
      bookingInfo,
      props.history,
      props.match.params.maLichChieu,
      movieInfo,
      chosenChairList,
      totalAmount,
    ]
  );

  React.useEffect(() => {
    const maLichChieu = movieInfo.maLichChieu;
    const danhSachVe = chosenChairList.map((chair) => ({
      maGhe: chair.maGhe,
      giaVe: chair.giaVe,
    }));
    const taiKhoanNguoiDung = user.taiKhoan;
    setBookingInfo({
      maLichChieu: maLichChieu,
      danhSachVe: danhSachVe,
      taiKhoanNguoiDung: taiKhoanNguoiDung,
    });
  }, [movieInfo.maLichChieu, chosenChairList, user]);

  return (
    <Paper className={classes.root} elevation={6}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.totalAmount}>{totalAmount + " đ"} </Box>
        <Box className={classes.theaterInfo}>
          <Box fontWeight={500} mb={1}>
            <Typography component="span" className={classes.age}>
              C18
            </Typography>
            {tenPhim}
          </Box>
          <Box>
            <Typography variant="subtitle1">{tenCumRap}</Typography>
            <Typography variant="subtitle1">
              {ngayChieu} - {gioChieu} - {tenRap}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.chairInfo}>
          <Typography>Ghế {renderChosenChairList()}</Typography>
          <Typography>{totalAmount + " đ"}</Typography>
        </Box>
        <Box className={classes.input}>
          <Typography className={classes.grayText}>Email</Typography>
          <input
            type="email"
            placeholder="Nhập email..."
            defaultValue={user.email}
          />
        </Box>
        <Box className={classes.input}>
          <Typography className={classes.grayText}>Số điện thoại</Typography>
          <input
            type="text"
            placeholder="Nhập SĐT..."
            defaultValue={user.soDT}
          />
        </Box>
        <Box className={classes.payment}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.grayText}>
              Phương thức thanh toán
            </FormLabel>
            <RadioGroup
              name="payment1"
              aria-label="payment"
              value={payment}
              onChange={handleChangePayment}
            >
              <Box className={classes.flexBox}>
                <CardMedia className={classes.icons} image={zalopay} />
                <FormControlLabel
                  value="zalopay"
                  control={<Radio />}
                  label="Thanh toán qua ZaloPay"
                />
              </Box>
              <Box className={classes.flexBox}>
                <CardMedia
                  className={classes.icons}
                  image="https://s3img.vcdn.vn/123phim/2018/12/e20d486bc2a60a2a1d7186c0ec9e177b.png"
                />
                <FormControlLabel
                  value="visa"
                  control={<Radio color="primary" />}
                  label="Visa, Master, JCB"
                />
              </Box>
              <Box className={classes.flexBox}>
                <CardMedia
                  className={classes.icons}
                  image="https://s3img.vcdn.vn/123phim/2018/12/784b134b515da6e0cb8779e2a33f8221.png"
                />
                <FormControlLabel
                  value="atm"
                  control={<Radio />}
                  label="Thẻ ATM nội địa"
                />
              </Box>
              <Box className={classes.flexBox}>
                <CardMedia
                  className={classes.icons}
                  image="https://s3img.vcdn.vn/123phim/2018/12/fa954e5ecb81ef0fdc9bb2595dfbd015.png"
                />
                <FormControlLabel
                  value="store"
                  control={<Radio />}
                  label="Thanh toán qua cửa hàng tiện lợi"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Button
          type="submit"
          className={classes.bookButton}
          disabled={!isValid}
        >
          ĐẶT VÉ
        </Button>
      </form>
    </Paper>
  );
};

export default withRouter(BookTicketRight);

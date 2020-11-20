import {
  AppBar,
  Box,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import classnames from "classnames";
import firebase from "firebase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_USER_LOGIN } from "../../redux/actions/actionTypes";
import theme from "../../theme/theme";
import BookingProcess from "../BookingProcess/BookingProcess";
import CustomPopover from "../CustomPopover/CustomPopover";
import Logo from "../Logo/logo";
import MobileDrawer from "../MobileDrawer/MobileDrawer";
import NavLink from "../NavLink/navLink";
import UserControl from "../UserControl/userControl";

const useStyles = makeStyles({
  root: {
    fontSize: theme.typography.fontSize,
    backgroundColor: "rgba(255,255,255,.95)",
    fontWeight: 500,
    maxHeight: 64,
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.duration,
    },
  },
  divider: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navLink: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userLink: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  box: {
    paddingTop: "4rem",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "3.125rem",
    },
  },
  userIcon: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1.5),
  },
  signUpIcon: {
    width: 40,
    height: 40,
    margin: theme.spacing(0, 1.5, 0, 1.5),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credentials);
  const bookingProcess = useSelector(
    (state) => state.ticketBookingInfo.process
  );

  const isAtBookTicketPage = React.useMemo(
    () => props.location.pathname.search(/muave/g) !== -1,
    [props.location]
  );

  const handleRedirectToLogInPage = React.useCallback(() => {
    props.history.push("/dangnhap");
  }, [props.history]);

  const handleRedirectToSignUpPage = React.useCallback(() => {
    props.history.push("/dangky");
  }, [props.history]);

  const handleLogOut = React.useCallback(async () => {
    localStorage.removeItem("credentials");
    dispatch(createAction(SET_USER_LOGIN, {}));
    if (user.picture) {
      await firebase.auth().signOut();
    }
  }, [dispatch, user.picture]);

  const userControlLogIn = React.useMemo(() => {
    return user.accessToken ? (
      <CustomPopover
        icon={
          user.picture ? (
            <CardMedia
              image={user.picture}
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          ) : null
        }
        content={(user.picture ? "" : `Xin chào, `) + user.hoTen}
        dropdownList={[<Box onClick={handleLogOut}>Đăng xuất</Box>]}
      />
    ) : (
      <UserControl
        icon={<AccountCircleOutlinedIcon className={classes.userIcon} />}
        content="Đăng nhập"
        onClickEvent={handleRedirectToLogInPage}
      />
    );
  }, [user, classes.userIcon, handleLogOut, handleRedirectToLogInPage]);

  const userControlSignUp = React.useMemo(() => {
    return user.accessToken ? null : (
      <>
        <Divider
          className={classnames(classes.userLink, classes.divider)}
          orientation="vertical"
          flexItem
        />
        <UserControl
          icon={<LockOpenIcon className={classes.signUpIcon} />}
          content="Đăng ký"
          onClickEvent={handleRedirectToSignUpPage}
        />
      </>
    );
  }, [
    user.accessToken,
    classes.userLink,
    classes.divider,
    classes.signUpIcon,
    handleRedirectToSignUpPage,
  ]);

  const navLink = React.useMemo(() => {
    return !isAtBookTicketPage ? (
      <>
        <NavLink sectionId="lichChieu" content="Lịch chiếu" />
        <NavLink sectionId="cumRap" content="Cụm rạp" />
      </>
    ) : null;
  }, [isAtBookTicketPage]);

  return (
    <>
      <AppBar position="fixed" elevation={5} className={classes.root}>
        <Toolbar>
          <Grid container>
            <Grid
              item
              container
              xs={12}
              sm={isAtBookTicketPage ? 7 : 2}
              md={isAtBookTicketPage ? 7 : 2}
              lg={isAtBookTicketPage ? 7 : 3}
              alignItems="center"
            >
              {!isAtBookTicketPage ? (
                <Logo />
              ) : (
                <BookingProcess
                  process={["Chọn ghế và thanh toán", "Kết quả đặt vé"]}
                  current={bookingProcess}
                />
              )}
            </Grid>
            <Grid
              item
              container
              xs={false}
              sm={isAtBookTicketPage ? true : 4}
              md={isAtBookTicketPage ? 5 : 5}
              lg={isAtBookTicketPage ? true : 6}
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.navLink}
            >
              {navLink}
            </Grid>
            <Grid
              item
              container
              xs={false}
              sm={isAtBookTicketPage ? 5 : 6}
              md={isAtBookTicketPage ? 5 : 5}
              lg={isAtBookTicketPage ? 5 : 3}
              direction="row"
              alignItems="center"
              justify="flex-end"
              className={classes.userLink}
            >
              {userControlLogIn}
              {userControlSignUp}
            </Grid>
          </Grid>
          <MobileDrawer
            itemList={[userControlLogIn, userControlSignUp, navLink]}
          />
        </Toolbar>
      </AppBar>
      <Box className={classes.box} />
    </>
  );
};

export default withRouter(Header);

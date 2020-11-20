import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  AlternateEmailRounded,
  LockRounded,
  PhoneAndroidRounded,
  SpellcheckRounded,
} from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { SignUpSchema } from "../../formik/schema";
import { DangKy } from "../../models/DangKy";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_IS_SIGNING_UP } from "../../redux/actions/actionTypes";
import { signUp } from "../../redux/actions/userActions";
import theme from "../../theme/theme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const useStyles = makeStyles({
  root: {
    height: 640,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3, 0),
    backgroundImage: "url('https://tix.vn/app/assets/img/icons/bg2.jpg')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: theme.spacing(4, 0),
    },
  },
  form: {
    width: "30%",
    textAlign: "center",
    border: "1px solid " + theme.palette.grey[250],
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    "& .MuiFormLabel-root": {
      color: theme.palette.grey[150],
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  title: {
    textTransform: "uppercase",
  },
  icons: {
    fontSize: "2rem",
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  textFieldGrid: {
    paddingRight: theme.spacing(3),
    margin: theme.spacing(1, 0),
    textAlign: "left",
    "& input": {
      width: "100%",
      padding: theme.spacing(0.3, 0.5),
    },
  },
  hint: {
    justifyContent: "flex-end",
    margin: theme.spacing(0, 4),
  },
  logIn: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    "&:hover": {
      textDecoration: "underline",
    },
  },
  signUpButton: {
    width: "100%",
    height: 40,
    margin: theme.spacing(2, 3),
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
});

const LogInForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSigningUp = useSelector((state) => state.user.isSigningUp);

  const handleRedirectToLogInPage = () => {
    props.history.push("/dangnhap");
  };

  React.useEffect(() => {
    document.getElementById("hoTen").focus();
  }, []);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={DangKy("", "", "", "", "GP01", "KhachHang", "")}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(signUp(values));
          dispatch(createAction(SET_IS_SIGNING_UP, true));
        }}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Typography className={classes.title} variant="h5">
              Đăng ký
            </Typography>
            <Grid container alignItems="center">
              {/* Full Name */}
              <Grid item xs={2}>
                <SpellcheckRounded className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="hoTen" className={classes.label}>
                  Họ tên
                </label>
                <Field id="hoTen" name="hoTen" placeholder="Nhập họ tên..." />
                {errors.hoTen && touched.hoTen ? (
                  <ErrorMessage message={errors.hoTen} />
                ) : (
                  <Box height={16.8}></Box>
                )}
              </Grid>
              {/* Account */}
              <Grid item xs={2}>
                <AccountCircle className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="taiKhoan" className={classes.label}>
                  Tài khoản
                </label>
                <Field
                  id="taiKhoan"
                  name="taiKhoan"
                  placeholder="Nhập tài khoản..."
                />
                {errors.taiKhoan && touched.taiKhoan ? (
                  <ErrorMessage message={errors.taiKhoan} />
                ) : (
                  <Box height={16.8}></Box>
                )}
              </Grid>
              {/* Password */}
              <Grid item xs={2}>
                <LockRounded className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="matKhau" className={classes.label}>
                  Mật khẩu
                </label>
                <Field
                  id="matKhau"
                  name="matKhau"
                  placeholder="Nhập mật khẩu..."
                  type="password"
                />
                {errors.matKhau && touched.matKhau ? (
                  <ErrorMessage message={errors.matKhau} />
                ) : (
                  <Box height={16.8}></Box>
                )}
              </Grid>
              {/* Email */}
              <Grid item xs={2}>
                <AlternateEmailRounded className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="email" className={classes.label}>
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Nhập email..."
                  type="email"
                />
                {errors.email && touched.email ? (
                  <ErrorMessage message={errors.email} />
                ) : (
                  <Box height={16.8}></Box>
                )}
              </Grid>
              {/* Phone */}
              <Grid item xs={2}>
                <PhoneAndroidRounded className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="soDt" className={classes.label}>
                  Số điện thoại
                </label>
                <Field
                  id="soDt"
                  name="soDt"
                  placeholder="Nhập số điện thoại..."
                />
                {errors.soDt && touched.soDt ? (
                  <ErrorMessage message={errors.soDt} />
                ) : (
                  <Box height={16.8}></Box>
                )}
              </Grid>
              <Button
                type="submit"
                className={classes.signUpButton}
                disabled={
                  !!errors.hoTen ||
                  !!errors.taiKhoan ||
                  !!errors.matKhau ||
                  !!errors.email ||
                  !!errors.soDt
                }
              >
                {isSigningUp ? (
                  <CircularProgress
                    style={{
                      width: 20,
                      height: 20,
                      color: theme.palette.text.secondary,
                    }}
                  />
                ) : (
                  "Đăng ký"
                )}
              </Button>
              <Grid item container xs={12} className={classes.hint}>
                <Typography>Đã có tài khoản?</Typography>
                <Box>
                  <Typography
                    className={classes.logIn}
                    onClick={handleRedirectToLogInPage}
                  >
                    Đăng nhập ngay!
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(LogInForm);

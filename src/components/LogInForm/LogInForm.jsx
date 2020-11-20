import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AccountCircle, Facebook, LockRounded } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { LogInSchema } from "../../formik/schema";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_IS_LOGGING_IN } from "../../redux/actions/actionTypes";
import { logIn } from "../../redux/actions/userActions";
import theme from "../../theme/theme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const useStyles = makeStyles({
  root: {
    height: 640,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 0),
    backgroundImage: "url('https://tix.vn/app/assets/img/icons/bg2.jpg')",
    backgroundSize: "contain",
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
    "& .MuiOutlinedInput-input": {
      padding: 0,
      height: 40,
      [theme.breakpoints.down("xs")]: {
        height: 30,
      },
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
    fontSize: "2.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  textFieldGrid: {
    height: 30,
    marginBottom: theme.spacing(5.5),
    textAlign: "left",
    display: "flex",
    flexWrap: "wrap",
    "& input": {
      width: "100%",
      height: "100%",
      padding: theme.spacing(0, 1),
    },
    "& label": {
      width: "100%",
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  hint: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  signUp: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    "&:hover": {
      textDecoration: "underline",
    },
  },
  logInButton: {
    width: "100%",
    height: 40,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    margin: theme.spacing(2, 0),
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: theme.palette.grey[100],
  },
  socialLogin: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "100%",
    marginTop: theme.spacing(1),
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      opacity: 0.5,
      transition: theme.transitions.duration,
    },
  },
  social: {
    color: theme.palette.common.white,
    fontSize: "2.5rem",
    marginRight: theme.spacing(2),
  },
});

const LogInForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credentials);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const delayTask = useSelector((state) => state.delayTask);

  const handleRedirectToSignUpPage = React.useCallback(() => {
    props.history.push("/dangky");
  }, [props.history]);

  React.useEffect(() => {
    if (user.accessToken && delayTask.destination)
      props.history.push(delayTask.destination);
    if (user.accessToken && !delayTask.destination) props.history.go(-1);
  }, [user.accessToken, delayTask.destination, props.history]);

  React.useEffect(() => {
    document.getElementById("taiKhoan").focus();
  }, []);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
        }}
        validationSchema={LogInSchema}
        onSubmit={(values) => {
          dispatch(logIn(values));
          dispatch(createAction(SET_IS_LOGGING_IN, true));
        }}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Typography className={classes.title} variant="h5">
              Đăng nhập
            </Typography>
            <Grid container alignItems="center">
              <Grid
                item
                container
                alignItems="center"
                justify="flex-start"
                xs={2}
              >
                <AccountCircle className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="taiKhoan">Tài khoản</label>
                <Field
                  id="taiKhoan"
                  name="taiKhoan"
                  placeholder="Nhập tài khoản..."
                />
                {errors.taiKhoan && touched.taiKhoan ? (
                  <ErrorMessage message={errors.taiKhoan} />
                ) : null}
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="flex-start"
                xs={2}
              >
                <LockRounded className={classes.icons} />
              </Grid>
              <Grid item xs={10} className={classes.textFieldGrid}>
                <label htmlFor="matKhau">Mật khẩu</label>
                <Field
                  id="matKhau"
                  name="matKhau"
                  placeholder="Nhập mật khẩu..."
                  type="password"
                />
                {errors.matKhau && touched.matKhau ? (
                  <ErrorMessage message={errors.matKhau} />
                ) : null}
              </Grid>
              <Button
                type="submit"
                className={classes.logInButton}
                disabled={!!errors.taiKhoan || !!errors.matKhau || isLoggingIn}
              >
                {isLoggingIn ? (
                  <CircularProgress
                    style={{
                      width: 20,
                      height: 20,
                      color: theme.palette.text.secondary,
                    }}
                  />
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <Grid item container xs={12} className={classes.hint}>
                <Typography>Chưa có tài khoản?</Typography>
                <Box
                  className={classes.signUp}
                  onClick={handleRedirectToSignUpPage}
                >
                  <Typography>Đăng ký ngay!</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.socialLogin}
                  onClick={() => props.authenticate("Facebook")}
                >
                  <Facebook className={classes.social} />
                  <Typography>Đăng nhập bằng Facebook</Typography>
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(LogInForm);

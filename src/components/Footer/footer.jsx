import { Avatar, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import go123 from "../../assets/img/123go.png";
import agribank from "../../assets/img/agribank.png";
import android from "../../assets/img/android-logo.png";
import apple from "../../assets/img/apple-logo.png";
import beta from "../../assets/img/beta.jpg";
import bhd from "../../assets/img/bhd.png";
import cgv from "../../assets/img/cgv.png";
import cinestar from "../../assets/img/cinestar.png";
import cnx from "../../assets/img/cnx.jpg";
import dcine from "../../assets/img/dcine.png";
import dongda from "../../assets/img/dongda.png";
import facebook from "../../assets/img/facebook-logo.png";
import galaxy from "../../assets/img/galaxycine.png";
import ivb from "../../assets/img/ivb.png";
import laban from "../../assets/img/laban.png";
import lotte from "../../assets/img/lottecine.png";
import megags from "../../assets/img/megags.png";
import payoo from "../../assets/img/payoo.jpg";
import starlight from "../../assets/img/starlight.png";
import touch from "../../assets/img/touch.png";
import vcb from "../../assets/img/vcb.png";
import viettinbank from "../../assets/img/viettinbank.png";
import zalo from "../../assets/img/zalo-logo.png";
import zalopay from "../../assets/img/zalopay.png";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[150],
    padding: theme.spacing(2, 0),
    fontSize: "0.8rem",
  },
  footerContainer: {
    width: "80%",
    margin: "0 auto",
  },
  footerColumn: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    fontSize: "0.8rem",
  },
  link: {
    color: theme.palette.grey[150],
    textDecoration: "none",
    transition: theme.transitions.duration,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.common.white,
    },
  },
  coop: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  coopIcons: {
    width: 30,
    height: 30,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, 3),
    },
  },
  appIcons: {
    height: "auto",
  },
  social: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      textAlign: "right",
    },
  },
  socialIcons: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
    },
  },
});

const Footer = () => {
  const classes = useStyles();
  const cooperatorImageList = [
    cgv,
    bhd,
    galaxy,
    cinestar,
    lotte,
    megags,
    beta,
    dongda,
    touch,
    cnx,
    starlight,
    dcine,
    zalopay,
    payoo,
    vcb,
    agribank,
    viettinbank,
    ivb,
    go123,
    laban,
  ];

  const renderCooperators = () => {
    return cooperatorImageList.map((image, index) => (
      <Grid item container xs={3} key={index} className={classes.coop}>
        <Avatar
          alt={image.toString()}
          src={image}
          classes={{ root: classes.coopIcons }}
        />
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.footerContainer}>
        <Grid item xs={12} md={4} className={classes.footerColumn}>
          <Typography className={classes.title}>
            Huỳnh Ngọc Khánh &copy;
          </Typography>
          <Grid item container>
            <Grid item xs={6}>
              <Link className={classes.link} href="#" tabIndex="-1">
                FAQ
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link className={classes.link} href="#" tabIndex="-1">
                Thỏa thuận sử dụng
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link className={classes.link} href="#" tabIndex="-1">
                Brand Guidelines
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link className={classes.link} href="#" tabIndex="-1">
                Chính sách bảo mật
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={3} className={classes.footerColumn}>
          <Typography className={classes.title}>ĐỐI TÁC</Typography>
          <Grid item container>
            {renderCooperators()}
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} className={classes.footerColumn}>
          <Grid item container>
            <Grid item xs={6}>
              <Typography className={classes.title}>MOBILE APP</Typography>
              <Grid item container>
                <Avatar
                  alt="apple"
                  src={apple}
                  classes={{ root: classes.appIcons }}
                  style={{ marginRight: "16px" }}
                />
                <Avatar
                  alt="android"
                  src={android}
                  classes={{ root: classes.appIcons }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.social}>
              <Typography className={classes.title}>SOCIAL</Typography>
              <Grid item container className={classes.socialIcons}>
                <Avatar
                  alt="facebook"
                  src={facebook}
                  classes={{ root: classes.appIcons }}
                  style={{ marginRight: "16px" }}
                />
                <Avatar
                  alt="zalo"
                  src={zalo}
                  classes={{ root: classes.appIcons }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;

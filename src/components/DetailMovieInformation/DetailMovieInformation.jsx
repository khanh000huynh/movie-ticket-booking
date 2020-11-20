import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import theme from "../../theme/theme";
import { toDMY } from "../../utils/showDate";

const useStyles = makeStyles({
  root: {
    color: theme.palette.common.white,
    fontSize: "0.875rem",
    justifyContent: "flex-start",
    alignItems: "flext-start",
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
  },
  key: {
    width: 120,
    marginRight: theme.spacing(8),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },
  value: {
    color: theme.palette.grey[300],
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  contentTitle: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4),
    },
  },
  content: {
    textAlign: "justify",
    marginTop: theme.spacing(2),
  },
});

const DetailMovieInformation = () => {
  const classes = useStyles();
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const { ngayKhoiChieu, tenPhim, moTa } = detailMovie;
  const thoiLuong = React.useMemo(() => {
    return !detailMovie.heThongRapChieu ||
      !detailMovie.heThongRapChieu[0] ||
      !detailMovie.heThongRapChieu[0].cumRapChieu
      ? 0
      : detailMovie.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0]
          .thoiLuong;
  }, [detailMovie]);

  return (
    <Grid container className={classes.root}>
      <Grid item md={6}>
        <Grid item container>
          <Typography className={classes.key}>Ngày công chiếu</Typography>
          <Typography className={classes.value}>
            {toDMY(ngayKhoiChieu)}
          </Typography>
        </Grid>
        <Grid item container>
          <Typography className={classes.key}>Tên phim</Typography>
          <Typography className={classes.value}>{tenPhim}</Typography>
        </Grid>
        <Grid item container>
          <Typography className={classes.key}>Thời lượng</Typography>
          <Typography className={classes.value}>{thoiLuong}</Typography>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Grid item xs={12} className={classes.contentTitle}>
          <Typography>Nội dung</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Typography>{moTa}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailMovieInformation;

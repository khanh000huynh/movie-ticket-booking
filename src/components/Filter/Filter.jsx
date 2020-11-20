import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-scroll";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_DETAIL_MOVIE } from "../../redux/actions/actionTypes";
import { setDelayTask } from "../../redux/actions/delayTaskActions";
import { setDetailMovie } from "../../redux/actions/detailActions";
import { chooseTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import { toDMY } from "../../utils/showDate";
import { convert } from "../../utils/showtime";

const useStyles = makeStyles({
  root: {
    width: "65%",
    height: "auto",
    margin: theme.spacing(5) + "px auto",
    borderRadius: "6px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.common.black,
    },
  },
  button: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },
  },
  canBookTicket: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  select: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    cursor: "pointer",
  },
  optionContainer: {
    maxHeight: 350,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[50],
    },
  },
});

const Filter = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({
    phim: null,
    rap: null,
    ngayXem: null,
    suatChieu: null,
  });
  const movieList = useSelector((state) => state.movie.movieList);
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const rap = React.useMemo(() => {
    const heThongRapChieu = detailMovie.heThongRapChieu;
    if (!heThongRapChieu) return;
    const cumRapList = [];
    heThongRapChieu.forEach((heThong) => {
      heThong.cumRapChieu.forEach((cumRap) => {
        cumRapList.push({
          maHeThongRap: heThong.maHeThongRap,
          logo: heThong.logo,
          cumRap,
        });
      });
    });
    return cumRapList;
  }, [detailMovie.heThongRapChieu]);
  const ngayXem = React.useMemo(() => {
    const rap = JSON.parse(filter.rap);
    if (!rap) return;
    const existed = [];
    rap.cumRap.lichChieuPhim.forEach((lichChieu) => {
      if (!existed.includes(toDMY(lichChieu.ngayChieuGioChieu))) {
        existed.push(toDMY(lichChieu.ngayChieuGioChieu));
      }
    });
    return existed;
  }, [filter.rap]);
  const suatChieu = React.useMemo(() => {
    const rap = JSON.parse(filter.rap);
    if (!rap) return;
    return rap.cumRap.lichChieuPhim
      .filter(
        (lichChieu) => toDMY(lichChieu.ngayChieuGioChieu) === filter.ngayXem
      )
      .map((lichChieu) => convert(lichChieu.ngayChieuGioChieu));
  }, [filter.rap, filter.ngayXem]);
  const canBookTicket = React.useMemo(() => {
    return filter.phim && filter.rap && filter.ngayXem && filter.suatChieu;
  }, [filter]);
  const maLichChieu = React.useMemo(() => {
    const rap = JSON.parse(filter.rap);
    if (!rap) return;
    return parseInt(
      ...rap.cumRap.lichChieuPhim
        .filter(
          (lichChieu) =>
            toDMY(lichChieu.ngayChieuGioChieu) === filter.ngayXem &&
            convert(lichChieu.ngayChieuGioChieu) === filter.suatChieu
        )
        .map((lichChieu) => lichChieu.maLichChieu)
    );
  }, [filter.rap, filter.ngayXem, filter.suatChieu]);
  const user = useSelector((state) => state.user.credentials);

  const handleChange = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === "rap") {
        const newValue = JSON.parse(value);
        dispatch(
          chooseTheaterSystem({
            maHeThongRap: newValue.maHeThongRap,
            logo: newValue.logo,
          })
        );
        sessionStorage.setItem("chosenTheaterSystem", JSON.stringify(newValue));
        setFilter({ ...filter, rap: value.cumRap });
      }
      setFilter({ ...filter, [name]: value });
    },
    [dispatch, filter]
  );

  const handleMoveToFilter = React.useCallback(() => {
    document.getElementById("filterLink").click();
  }, []);

  const handleBookTickets = React.useCallback(() => {
    const rapSelect = JSON.parse(filter.rap);
    const ngayChieuGioChieu = rapSelect.cumRap.lichChieuPhim.filter(
      (lichChieu) =>
        toDMY(lichChieu.ngayChieuGioChieu) === filter.ngayXem &&
        convert(lichChieu.ngayChieuGioChieu) === filter.suatChieu
    )[0].ngayChieuGioChieu;
    sessionStorage.setItem(
      "ngayChieuGioChieu",
      JSON.stringify(ngayChieuGioChieu)
    );
    if (!user.accessToken)
      dispatch(setDelayTask({ destination: `/muave/${maLichChieu}` }));
    props.history.push(`/muave/${maLichChieu}`);
  }, [
    filter.rap,
    filter.ngayXem,
    filter.suatChieu,
    user.accessToken,
    dispatch,
    props.history,
    maLichChieu,
  ]);

  const renderPhimOptions = React.useCallback(() => {
    if (!movieList) return;
    return movieList.map((movie, index) => (
      <option key={index} value={movie.maPhim}>
        {movie.tenPhim}
      </option>
    ));
  }, [movieList]);

  const renderRapOptions = React.useCallback(() => {
    if (!filter.phim) return <option disabled>Vui lòng chọn phim</option>;
    if (!rap) return <option disabled>Không có rạp chiếu</option>;
    return rap.map((cumRap, index) => (
      <option key={index} value={JSON.stringify(cumRap)}>
        {cumRap.cumRap.tenCumRap}
      </option>
    ));
  }, [filter.phim, rap]);

  const renderNgayXemOptions = React.useCallback(() => {
    if (!filter.rap) return <option disabled>Vui lòng chọn rạp</option>;
    if (!ngayXem) return <option disabled>Không có ngày chiếu</option>;
    return ngayXem.map((ngayXem, index) => (
      <option key={index} value={ngayXem}>
        {ngayXem}
      </option>
    ));
  }, [filter.rap, ngayXem]);

  const renderSuatChieuOptions = React.useCallback(() => {
    if (!filter.ngayXem)
      return <option disabled>Vui lòng chọn ngày xem</option>;
    if (!suatChieu) return <option disabled>Không có suất chiếu</option>;
    return suatChieu.map((suatChieu, index) => (
      <option key={index} value={suatChieu}>
        {suatChieu}
      </option>
    ));
  }, [filter.ngayXem, suatChieu]);

  React.useEffect(() => {
    const phim = filter.phim;
    if (phim) {
      new Promise((resolve) => {
        dispatch(createAction(SET_DETAIL_MOVIE, {}));
        resolve(setFilter({ phim, rap: null, ngayXem: null, suatChieu: null }));
      }).then(() => {
        dispatch(setDetailMovie(phim));
      });
    }
  }, [dispatch, filter.phim]);

  return (
    <Paper square elevation={6} className={classes.root}>
      <Link to="filter" id="filterLink" offset={-300} smooth duration={500} />
      <Grid container spacing={1}>
        <Grid item container md={3} alignItems="center">
          <select
            aria-readonly
            className={classes.select}
            onClick={handleMoveToFilter}
            onChange={handleChange}
            name="phim"
          >
            <option hidden>Phim</option>
            {renderPhimOptions()}
          </select>
        </Grid>
        <Grid item container md={3} alignItems="center">
          <select
            aria-readonly
            className={classes.select}
            onClick={handleMoveToFilter}
            onChange={handleChange}
            name="rap"
          >
            <option hidden>Rạp</option>
            {renderRapOptions()}
          </select>
        </Grid>
        <Grid item container md={2} alignItems="center">
          <select
            aria-readonly
            className={classes.select}
            onClick={handleMoveToFilter}
            onChange={handleChange}
            name="ngayXem"
          >
            <option hidden>Ngày xem</option>
            {renderNgayXemOptions()}
          </select>
        </Grid>
        <Grid item container md={2} alignItems="center">
          <select
            aria-readonly
            className={classes.select}
            onClick={handleMoveToFilter}
            onChange={handleChange}
            name="suatChieu"
          >
            <option hidden>Suất chiếu</option>
            {renderSuatChieuOptions()}
          </select>
        </Grid>
        <Grid item container md={2}>
          <Button
            disabled={!canBookTicket}
            disableElevation
            variant="contained"
            size="medium"
            fullWidth
            className={classnames(
              classes.button,
              canBookTicket ? classes.canBookTicket : ""
            )}
            onClick={handleBookTickets}
          >
            MUA VÉ NGAY
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(Filter);

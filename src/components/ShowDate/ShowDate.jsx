import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import classnames from "classnames";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetailShowDate } from "../../redux/actions/detailActions";
import theme from "../../theme/theme";
import { toDMY } from "../../utils/showDate";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 87,
    height: 80,
    cursor: "pointer",
    "&:hover, &:active": {
      backgroundColor: "inherit",
      color: theme.palette.warning.main,
    },
    "": {},
  },
  dayOfMonth: {
    fontSize: "1.25rem",
  },
  showDate: {
    textAlign: "center",
  },
  chosen: {
    color: theme.palette.error.main,
  },
});

const ShowDate = (props) => {
  const classes = useStyles();
  const { dayOfWeek, dayOfMonth, month, datetime, index } = props;
  const dispatch = useDispatch();
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const detailShowDate = useSelector((state) => state.detail.detailShowDate);

  const isChosen = () => {
    if (toDMY(detailShowDate) === toDMY(datetime)) {
      return classes.chosen;
    }
    return "";
  };

  const handleChooseDate = React.useCallback(() => {
    dispatch(setDetailShowDate(datetime));
  }, [dispatch, datetime]);

  React.useEffect(() => {
    if (chosenTheaterSystem && index === 0)
      dispatch(setDetailShowDate(datetime));
  }, [chosenTheaterSystem, index, dispatch, datetime]);

  React.useEffect(() => {
    const heThongRapChieu = detailMovie.heThongRapChieu;
    if (!heThongRapChieu) return;
    const heThongRapChieuIndex = heThongRapChieu.findIndex(
      (system) => system.maHeThongRap === chosenTheaterSystem.maHeThongRap
    );
    const chosenHeThongRapChieu = heThongRapChieu[heThongRapChieuIndex];
    if (!chosenHeThongRapChieu) return;
    const ngayGioChieu = [];
    const cumRapChieu = chosenHeThongRapChieu.cumRapChieu;
    cumRapChieu.forEach((rap) => {
      const lichChieuPhim = rap.lichChieuPhim;
      ngayGioChieu.push(lichChieuPhim);
    });
  }, [detailMovie, chosenTheaterSystem, datetime, dispatch]);

  return (
    <Button className={classes.root} disableRipple onClick={handleChooseDate}>
      <Box className={classnames(classes.showDate, isChosen())}>
        <Typography>{dayOfWeek}</Typography>
        <Typography className={classes.dayOfMonth}>
          {dayOfMonth + "/" + month}
        </Typography>
      </Box>
    </Button>
  );
};

export default memo(ShowDate);

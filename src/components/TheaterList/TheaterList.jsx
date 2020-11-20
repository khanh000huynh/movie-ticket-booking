import { Box, makeStyles, Typography } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/img/no-image.png";
import { chooseTheater } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import { getTheaterName } from "../../utils/theater";

const useStyles = makeStyles({
  root: {
    fontSize: theme.typography.fontSize - 2,
    fontWeight: 500,
    cursor: "pointer",
    transition: theme.transitions.duration,
    "&:hover": {
      opacity: 1,
      transition: theme.transitions.duration,
    },
  },
  media: {
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
  },
  title: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  green: {
    fontSize: "1em",
    color: theme.palette.success.light,
    fontWeight: 500,
  },
  address: {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: theme.palette.grey[150],
  },
  detail: {
    fontSize: "0.75rem",
    color: theme.palette.warning.main,
    fontWeight: 500,
  },
  blur: {
    opacity: 0.5,
  },
});

const TheaterList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { theater, defaultChosen } = props;
  const { maCumRap, tenCumRap, diaChi } = theater;
  // Actually I don't need chosenTheaterSystem but the api doesn't have the theater logo
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const hasBlurEffect = React.useCallback(() => {
    if (chosenTheater.maCumRap === maCumRap) return "";
    return classes.blur;
  }, [chosenTheater.maCumRap, maCumRap, classes.blur]);

  const handleChooseTheater = React.useCallback(
    (theater) => () => {
      dispatch(chooseTheater(theater));
    },
    [dispatch]
  );

  const handleLoadedImage = React.useCallback((event) => {
    if (event.target.complete) setImageLoaded(true);
  }, []);

  React.useEffect(() => {
    if (defaultChosen) dispatch(chooseTheater(theater));
  }, [defaultChosen, dispatch, theater]);

  return (
    <Box
      onClick={handleChooseTheater(props.theater)}
      className={classnames(classes.root, hasBlurEffect())}
      display="flex"
      alignItems="center"
    >
      <img
        src={
          imageLoaded && chosenTheaterSystem.logo
            ? chosenTheaterSystem.logo
            : noImage
        }
        alt={chosenTheaterSystem.logo}
        className={classes.media}
        onLoad={handleLoadedImage}
      />
      <Box ml={1.5}>
        <Box
          className={classes.title}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          fontSize="0.875rem"
        >
          <Typography component="span">
            <Typography className={classes.green} component="b">
              {getTheaterName(tenCumRap).prefix}&nbsp;
            </Typography>
            - {getTheaterName(tenCumRap).suffix}
          </Typography>
        </Box>
        <Box className={classes.address}>
          <Typography className={classes.address}>{diaChi}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TheaterList;

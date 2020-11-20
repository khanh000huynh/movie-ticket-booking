import { Box, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/img/no-image.png";
import { chooseTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    backgroundSize: "contain",
    cursor: "pointer",
    transition: theme.transitions.duration,
    "&:hover": {
      opacity: 1,
      transition: theme.transitions.duration,
    },
  },
  blur: {
    opacity: 0.5,
  },
});

const TheaterSystem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { system } = props;
  const { logo, maHeThongRap } = system;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleChooseTheaterSystem = React.useCallback(
    (system) => () => {
      dispatch(chooseTheaterSystem(system));
    },
    [dispatch]
  );

  const handleLoadedImage = React.useCallback((event) => {
    if (event.target.complete) setImageLoaded(true);
  }, []);

  const hasBlurEffect = React.useCallback(() => {
    if (chosenTheaterSystem.maHeThongRap === maHeThongRap) {
      return "";
    }
    return classes.blur;
  }, [chosenTheaterSystem.maHeThongRap, maHeThongRap, classes.blur]);

  return (
    <Box onClick={handleChooseTheaterSystem(system)} className={classes.root}>
      <img
        src={imageLoaded && logo ? logo : noImage}
        alt={logo}
        className={classnames(classes.logo, hasBlurEffect())}
        onLoad={handleLoadedImage}
      />
    </Box>
  );
};

export default TheaterSystem;

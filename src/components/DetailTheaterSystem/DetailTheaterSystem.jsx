import {
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2, 2.5, 0, 2.5),
    cursor: "pointer",
    transition: theme.transitions.duration,
    "& *": {
      fontSize: "1rem",
    },
    "&:hover": {
      opacity: 1,
      transition: theme.transitions.duration,
    },
  },
  media: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
  },
  divider: {
    height: 1,
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[250],
  },
  blur: {
    opacity: 0.5,
  },
});

const DetailTheaterSystem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { defaultChosen, system } = props;
  const { maHeThongRap, tenHeThongRap, logo } = system;
  let chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );

  const hasBlurEffect = React.useCallback(() => {
    if (chosenTheaterSystem.maHeThongRap === maHeThongRap) return "";
    return classes.blur;
  }, [chosenTheaterSystem.maHeThongRap, maHeThongRap, classes.blur]);

  const handleChooseTheaterSystem = React.useCallback(
    (system) => () => {
      if (!chosenTheaterSystem) return;
      dispatch(chooseTheaterSystem(system));
    },
    [dispatch, chosenTheaterSystem]
  );

  React.useEffect(() => {
    if (defaultChosen) dispatch(chooseTheaterSystem(system));
  }, [defaultChosen, dispatch, system]);

  return (
    <>
      {system ? (
        <div onClick={handleChooseTheaterSystem(system)}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classnames(classes.root, hasBlurEffect())}
          >
            <CardMedia image={logo} className={classes.media} />
            <Typography variant="subtitle2">{tenHeThongRap}</Typography>
            <Divider className={classes.divider} />
          </Grid>
        </div>
      ) : (
        <Skeleton
          width="80%"
          height={80}
          animation="wave"
          style={{ margin: "0 auto" }}
        />
      )}
    </>
  );
};

export default DetailTheaterSystem;

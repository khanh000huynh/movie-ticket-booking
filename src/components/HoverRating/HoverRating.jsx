import { Box, makeStyles } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  ratingPoint: {
    width: "100%",
    color: theme.palette.success.main,
    fontSize: "2.5rem",
  },
  starPoint: {
    width: "100%",
    color: theme.palette.warning.main,
    fontSize: "2rem",
  },
});

const HoverRating = (props) => {
  const classes = useStyles();
  const { getRatingPoint } = props;
  const [value, setValue] = React.useState(2.5);
  const [hover, setHover] = React.useState(-1);
  const labels = React.useMemo(
    () => ({
      0.5: 1,
      1: 2,
      1.5: 3,
      2: 4,
      2.5: 5,
      3: 6,
      3.5: 7,
      4: 8,
      4.5: 9,
      5: 10,
    }),
    []
  );

  const handleChooseStarPoint = React.useCallback(() => {
    setValue(hover);
    getRatingPoint(labels[hover]);
  }, [hover, getRatingPoint, labels]);

  return (
    <Box className={classes.root}>
      {value && (
        <Box className={classes.ratingPoint}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        className={classes.starPoint}
        onClick={handleChooseStarPoint}
      />
    </Box>
  );
};

export default HoverRating;

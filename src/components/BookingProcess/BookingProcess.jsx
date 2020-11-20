import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    "& > b": {
      margin: theme.spacing(0, 4, 0, 2),
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.65rem",
        wordBreak: "break-all",
      },
    },
  },
  current: {
    color: theme.palette.warning.main,
  },
});

const BookingProcess = (props) => {
  const { process, current } = props;
  const classes = useStyles();

  const renderProcess = React.useCallback(() => {
    return process.map((step, index) => (
      <Typography
        key={index}
        component="b"
        className={index <= current ? classes.current : ""}
      >
        {(index + 1 < 10 ? "0" + (index + 1) : index + 1) + ". " + step}
      </Typography>
    ));
  }, [process, classes, current]);

  return <Box className={classes.root}>{renderProcess()}</Box>;
};

export default BookingProcess;

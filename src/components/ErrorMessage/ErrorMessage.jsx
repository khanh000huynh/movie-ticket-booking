import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    color: theme.palette.error.light,
    textAlign: "left",
    fontSize: "0.7rem",
  },
});

const ErrorMessage = (props) => {
  const classes = useStyles();
  const { message } = props;

  return (
    <Typography component="div" className={classes.root}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;

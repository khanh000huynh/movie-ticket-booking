import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    color: theme.palette.grey[50],
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0.5, 0),
    },
  },
});

const UserControl = (props) => {
  const classes = useStyles();
  const { icon, content, onClickEvent } = props;

  return (
    <div
      href=""
      underline="none"
      className={classes.root}
      onClick={onClickEvent}
    >
      <Grid container alignItems="center">
        {icon}
        <Typography variant="body2">{content}</Typography>
      </Grid>
    </div>
  );
};

export default UserControl;

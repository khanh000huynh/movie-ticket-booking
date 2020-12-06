import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import theme from "../../theme/theme";
import DropdownItem from "../DropdownItem/DropdownItem";

const useStyles = makeStyles({
  root: {
    color: theme.palette.grey[50],
    display: "flex",
    alignItems: "center",
    height: "100%",
    position: "relative",
    "&:hover $dropdown": {
      display: "block",
      zIndex: 9999,
    },
  },
  dropdown: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 0,
    display: "none",
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    height: "auto",
    zIndex: -9,
  },
});

const Dropdown = (props) => {
  const { content, dropdownList, icon } = props;
  const classes = useStyles();

  const isAtBookingPage = React.useMemo(
    () => props.location.pathname.search(/muave/g) !== -1,
    [props.location.pathname]
  );

  const renderDropdown = React.useCallback(() => {
    return dropdownList.map((item, index) => (
      <Grid item xs={12} md={12} key={index}>
        <DropdownItem item={item} />
      </Grid>
    ));
  }, [dropdownList]);

  return (
    <Box className={classes.root}>
      {icon}
      <Typography>{content}</Typography>
      {!isAtBookingPage && (
        <Paper elevation={3} className={classes.dropdown}>
          <Grid container wrap="wrap">
            {renderDropdown()}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default withRouter(Dropdown);

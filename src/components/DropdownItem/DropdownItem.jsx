import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    color: theme.palette.text.primary,
    cursor: "pointer",
    fontWeight: 400,
    padding: theme.spacing(0.5, 1),
    "&:hover": {
      backgroundColor: theme.palette.grey[250],
    },
  },
});

const DropdownItem = (props) => {
  const classes = useStyles();
  const { item } = props;
  const { name, onClickEvent } = item;

  return (
    <Box className={classes.root} onClick={onClickEvent}>
      {name}
    </Box>
  );
};

export default DropdownItem;

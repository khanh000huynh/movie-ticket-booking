import { Box, Button, makeStyles, Popover } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import UserControl from "../UserControl/userControl";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .MuiTypography-root": {
      textTransform: "none",
    },
  },
  dropdown: {
    width: 123,
    fontWeight: 400,
    cursor: "pointer",
    "& .MuiButton-label": {
      justifyContent: "left",
    },
    "& button": {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

const CustomPopover = (props) => {
  const classes = useStyles();
  const { icon, content, dropdownList } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDropdownList = React.useCallback(() => {
    return dropdownList.map((item, index) => (
      <Button fullWidth key={index}>
        {item}
      </Button>
    ));
  }, [dropdownList]);

  return (
    <div>
      <Button onClick={handleClick} disableRipple className={classes.root}>
        <UserControl
          aria-describedby={id}
          variant="contained"
          color="primary"
          style={{ width: "auto" }}
          icon={icon}
          content={content}
          className={classes.userControl}
        />
      </Button>
      {props.location.pathname.search(/muave/g) === -1 ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box className={classes.dropdown}>{renderDropdownList()}</Box>
        </Popover>
      ) : null}
    </div>
  );
};

export default withRouter(CustomPopover);

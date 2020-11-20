import { makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-scroll";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    color: theme.palette.text.primary,
    cursor: "pointer",
    margin: theme.spacing(0, 1),
    textTransform: "uppercase",
    transition: theme.transitions.duration,
    "&:hover": {
      color: theme.palette.warning.light,
      transition: theme.transitions.duration,
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: theme.spacing(1.5, 0),
      textAlign: "left",
    },
  },
});

const NavLink = (props) => {
  const classes = useStyles();
  const { sectionId, content } = props;
  const isAtHomePage = React.useMemo(() => {
    return props.location.pathname.search(/^\/$/g) !== -1;
  }, [props.location.pathname]);

  const handleRedirectToHomPage = () => {
    if (!isAtHomePage) props.history.push("/");
    sessionStorage.setItem("sectionId", sectionId);
  };

  return (
    <>
      {isAtHomePage ? (
        <div className={classes.root}>
          <Link
            to={sectionId ?? ""}
            spy={true}
            smooth={true}
            duration={500}
            offset={-74.4}
          >
            {content}
          </Link>
        </div>
      ) : (
        <div onClick={handleRedirectToHomPage} className={classes.root}>
          {content}
        </div>
      )}
    </>
  );
};

export default withRouter(NavLink);

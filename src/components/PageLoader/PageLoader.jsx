import { CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    backgroundColor: theme.palette.common.white,
    width: "100%",
    height: "100%",
    zIndex: 10000,
  },
  "@keyframes myRotate": {
    "0%": {
      transform: "translate(-50%, -50%) rotate(0deg)",
    },
    "35%": {
      transform: "translate(-50%, -50%) rotate(-15deg)",
    },
    "55%": {
      transform: "translate(-50%, -50%) rotate(20deg)",
    },
    "75%": {
      transform: "translate(-50%, -50%) rotate(-18deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) rotate(10deg)",
    },
  },
  logo: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transition: theme.transitions.duration,
    transform: "translate(-50%, -50%)",
    WebkitTransform: "translate(-50%, -50%)",
    MozTransformOrigin: "translate(-50%, -50%)",
    msTransformOrigin: "translate(-50%, -50%)",
    width: 150,
    height: 150,
    animation: "$myRotate 1.5s infinite",
  },
  stop: {
    transition: "1.5s",
    opacity: 0,
  },
  destroyed: {
    display: "none",
  },
});

const PageLoader = (props) => {
  const { stopCondition } = props;
  const classes = useStyles();

  React.useEffect(() => {
    const pageLoader = document.getElementById("page-loader");
    if (!stopCondition) return;
    if (
      pageLoader.getAttribute("class").indexOf(classes.stop.toString() !== -1)
    ) {
      pageLoader.className += " " + classes.stop;
      setTimeout(() => {
        pageLoader.className += " " + classes.destroyed;
      }, 1500);
    }
  }, [stopCondition, classes.stop, classes.destroyed]);

  return (
    <div className={classes.root} id="page-loader">
      <CardMedia
        image="https://tix.vn/app/assets/img/icons/web-logo.png"
        className={classes.logo}
      />
    </div>
  );
};

export default PageLoader;

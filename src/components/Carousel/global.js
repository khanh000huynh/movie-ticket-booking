import theme from "../../theme/theme";

const { withStyles } = require("@material-ui/core");

export const GlobalSlickCss = withStyles({
  "@global": {
    ".slick-slider": {
      height: "auto",
    },
    ".slick-dots": {
      marginBottom: theme.spacing(6),
      "& li button:hover::before": {
        color: theme.palette.common.white,
      },
      "& li button::before": {
        fontSize: "1rem",
        color: theme.palette.grey[250],
        opacity: 1,
        [theme.breakpoints.down("xs")]: {
          fontSize: "0.7rem",
        },
      },
      "& li.slick-active button::before": {
        color: theme.palette.warning.main,
      },
    },
    ".slick-arrow": {
      zIndex: 1,
      opacity: 1,
      "&::before": {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none !important",
      },
    },
    ".slick-prev": {
      left: theme.spacing(2),
      backgroundImage:
        "url('https://tix.vn/app/assets/img/icons/back-session.png')",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: 50,
      height: 50,
      "&:hover, &:focus": {
        backgroundImage:
          "url('https://tix.vn/app/assets/img/icons/back-session.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: 50,
        height: 50,
      },
    },
    ".slick-next": {
      right: theme.spacing(2),
      backgroundImage:
        "url('https://tix.vn/app/assets/img/icons/next-session.png')",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: 50,
      height: 50,
      "&:hover, &:focus": {
        backgroundImage:
          "url('https://tix.vn/app/assets/img/icons/next-session.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: 50,
        height: 50,
      },
    },
  },
})(() => null);

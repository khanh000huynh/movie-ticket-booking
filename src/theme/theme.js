const { createMuiTheme } = require("@material-ui/core/styles");

const theme = createMuiTheme({
  palette: {
    warning: {
      main: "#FB4226",
      light: "#FA5238",
      100: "#fb4226b0",
    },
    success: {
      main: "#108F3E",
      100: "#7ED321",
      150: "#44C020",
    },
    common: {
      black: "#0000007a",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    grey: {
      50: "#9B9B9B",
      100: "#4A4A4A",
      150: "#949494",
      200: "#222222",
      250: "#D8D8D8",
      300: "#E9E9E9",
      350: "rgba(246,246,246,.5)",
    },
  },
  typography: {
    fontSize: 14,
  },
  transitions: {
    duration: "0.2s",
  },
  overrides: {
    MuiTypography: {
      root: {
        fontSize: "14px",
      },
      body1: {
        fontSize: "14px",
      },
      body2: {
        fontSize: "14px",
      },
    },
    MuiMobileStepper: {
      dot: {
        width: 12,
        height: 12,
        backgroundColor: "#D8D8D8",
        margin: "0 5px",
        border: "2px solid #ffffff",
      },
      dotActive: {
        backgroundColor: "#FB4226",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
  },
});

export default theme;

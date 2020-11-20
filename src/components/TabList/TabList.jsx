import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import theme from "../../theme/theme";
import TabPanel from "../TabPanel/tabPanel";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabList = (props) => {
  const { tabList, tabPanelList, whiteColor, sectionId } = props;
  const useStyles = makeStyles({
    root: {
      margin: "0 auto",
      [theme.breakpoints.up("lg")]: {
        width: "65%",
      },
      [theme.breakpoints.down("md")]: {
        width: "88%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& .slick-arrow": {
        [theme.breakpoints.down("sm")]: {
          display: "none !important",
        },
      },
      "& .slick-arrow::before": {
        color: theme.palette.grey[100],
        fontSize: "2rem",
      },
      "& .slick-prev": {
        left: theme.spacing(-9),
      },
      "& .slick-next": {
        right: theme.spacing(-9),
      },
    },
    tabsIndicator: {
      backgroundColor: "transparent",
    },
    tab: {
      color: whiteColor
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
      margin: theme.spacing(2, 0),
      transition: theme.transitions.duration,
      "&.Mui-selected": {
        color: theme.palette.warning.main,
      },
      "&:hover": {
        color: theme.palette.warning.main,
      },
    },
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    return tabList.map((tab, index) => (
      <Tab
        label={tab}
        disableRipple
        classes={{
          root: classes.tab,
          selected: index === 0 ? classes.tabSelected : "",
        }}
        {...a11yProps(index)}
        key={index}
      />
    ));
  };

  const renderTabPanels = () => {
    return tabPanelList.map((panel, index) => (
      <TabPanel value={value} index={index} key={index}>
        {panel}
      </TabPanel>
    ));
  };

  return (
    <div className={classes.root} id={sectionId}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        classes={{ indicator: classes.tabsIndicator }}
      >
        {renderTabs()}
      </Tabs>
      {renderTabPanels()}
    </div>
  );
};

export default TabList;

import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import BookTicketLeft from "../../components/BookTicketLeft/BookTicketLeft";
import BookTicketRight from "../../components/BookTicketRight/BookTicketRight";
import Header from "../../components/Header/Header";
import PageLoader from "../../components/PageLoader/PageLoader";
import {
  setChosenChairListToEmpty,
  setTicketBookingInfo,
} from "../../redux/actions/ticketBookingActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  left: {
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
});

const BookTicketPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const maLichChieu = React.useMemo(() => props.match.params.maLichChieu, [
    props.match.params.maLichChieu,
  ]);
  const movieInfo = useSelector((state) => state.ticketBookingInfo.movieInfo);
  const chairList = useSelector((state) => state.ticketBookingInfo.chairList);
  const chosenChairList = useSelector(
    (state) => state.ticketBookingInfo.chosenChairList
  );

  React.useEffect(() => {
    const ngayChieuGioChieu = JSON.parse(
      sessionStorage.getItem("ngayChieuGioChieu")
    );
    if (ngayChieuGioChieu) {
      dispatch(setTicketBookingInfo(maLichChieu, ngayChieuGioChieu));
    }
  }, [dispatch, maLichChieu]);

  React.useEffect(() => {
    dispatch(setChosenChairListToEmpty());
  }, [dispatch]);

  return (
    <>
      <PageLoader stopCondition={movieInfo.maLichChieu && chairList.length} />
      {movieInfo.maLichChieu && chairList.length ? (
        <React.Fragment>
          <Header />
          <Grid container>
            <Grid item xs={12} sm={12} md={8} className={classes.left}>
              <BookTicketLeft
                movieInfo={movieInfo}
                chairList={chairList}
                chosenChairList={chosenChairList}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BookTicketRight
                movieInfo={movieInfo}
                chosenChairList={chosenChairList}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      ) : null}
    </>
  );
};

export default withRouter(BookTicketPage);

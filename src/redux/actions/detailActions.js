import connector from "../../configs/connector";
import { createAction } from "../actions/actionCreator";
import {
  SET_DETAIL_MOVIE,
  SET_DETAIL_SHOWDATE,
  SET_DETAIL_SHOWTIME,
  SET_DETAIL_THEATER_LIST,
} from "./actionTypes";

export const setDetailMovie = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_DETAIL_MOVIE, res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const setDetailShowDate = (showDate) => {
  return (dispatch) => {
    dispatch(createAction(SET_DETAIL_SHOWDATE, showDate));
  };
};

export const setDetailTheaterList = (theaterList) => {
  return (dispatch) => {
    dispatch(createAction(SET_DETAIL_THEATER_LIST, theaterList));
  };
};

export const setDetailShowtime = (showtimeList) => {
  return (dispatch) => {
    dispatch(createAction(SET_DETAIL_SHOWTIME, showtimeList));
  };
};

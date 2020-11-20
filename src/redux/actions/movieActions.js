import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import {
  SET_FINISHED_LOADING_MOVIES,
  SET_MISSING_INFO,
  SET_MOVIE,
  SET_MOVIE_INFO,
  SET_SHOWING,
  SET_SHOWTIME,
} from "./actionTypes";

export const setFinishedLoadingMovies = (isLoading) => {
  return (dispatch) => {
    dispatch(createAction(SET_FINISHED_LOADING_MOVIES, isLoading));
  };
};

export const setMovieInfo = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_MOVIE_INFO, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setMovies = () => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_MOVIE, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setShowing = () => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP10`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_SHOWING, res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const setShowtime = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(
          createAction(SET_SHOWTIME, {
            maPhim,
            heThongRapChieu: res.data.heThongRapChieu,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setMissingInfo = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_MISSING_INFO, res.data));
      })
      .catch((err) => console.log(err));
  };
};

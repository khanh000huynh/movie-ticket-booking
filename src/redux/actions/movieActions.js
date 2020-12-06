import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import {
  SET_MOVIE,
  SET_MOVIE_RATING,
  SET_SHOWING,
  SET_SHOWTIME,
} from "./actionTypes";

export const setMovies = () => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_MOVIE, res.data));
        const movieList = res.data;
        connector({
          url: `https://5f1d781039d95a0016954056.mockapi.io/api/movie-rating`,
          method: "GET",
        }).then((ratedMovie) => {
          const ratedMovieList = ratedMovie.data;
          movieList.map((movie) => {
            let rating;
            if (
              ratedMovieList
                .map((movie) => +movie.maPhim)
                .includes(+movie.maPhim)
            ) {
              rating = ratedMovieList.find(
                (rated) => +rated.maPhim === +movie.maPhim
              )?.danhGia;
              dispatch(
                createAction(SET_MOVIE_RATING, {
                  maPhim: movie.maPhim,
                  danhGia: rating,
                })
              );
              return { ...movie, rating };
            }
            return movie;
          });
        });
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

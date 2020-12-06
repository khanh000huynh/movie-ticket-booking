import connector from "../../configs/connector";
import { createAction } from "../actions/actionCreator";
import {
  SET_DETAIL_MOVIE,
  SET_DETAIL_MOVIE_RATING,
  SET_DETAIL_MOVIE_RATING_LIKES,
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

export const setDetailMovieRating = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://5f1d781039d95a0016954056.mockapi.io/api/movie-rating`,
      method: "GET",
    })
      .then((res) => {
        const detailMovieRating = res.data.find(
          (movie) => +movie.maPhim === +maPhim
        );
        dispatch(createAction(SET_DETAIL_MOVIE_RATING, detailMovieRating));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDetailMovieRatingLikes = (taiKhoan, maPhim) => {
  return (dispatch) => {
    connector({
      url: "http://5f1d781039d95a0016954056.mockapi.io/api/liked-rating",
      method: "GET",
    })
      .then((res) => {
        const likedRating = res.data.find(
          (rating) => rating.taiKhoan === taiKhoan && rating.maPhim === maPhim
        );
        dispatch(createAction(SET_DETAIL_MOVIE_RATING_LIKES, likedRating));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDetailMovieRatingMockApi = ({ maPhim, tenPhim, danhGia }) => {
  return (dispatch) => {
    connector({
      url: "https://5f1d781039d95a0016954056.mockapi.io/api/movie-rating",
      method: "GET",
    })
      .then(async (res) => {
        const movie = await res.data.find((movie) => movie.maPhim === maPhim);
        const ratingList = (await movie?.danhGia) || [];
        ratingList.length && ratingList.unshift(danhGia);
        if (!res.data.map((item) => +item.maPhim).includes(+maPhim)) {
          return connector({
            url: "https://5f1d781039d95a0016954056.mockapi.io/api/movie-rating",
            method: "POST",
            data: {
              maPhim,
              tenPhim,
              danhGia: ratingList.length ? ratingList : [danhGia],
            },
          });
        }
        return connector({
          url: `https://5f1d781039d95a0016954056.mockapi.io/api/movie-rating/${movie.id}`,
          method: "PUT",
          data: {
            maPhim,
            tenPhim,
            danhGia: ratingList.length ? ratingList : [danhGia],
          },
        });
      })
      .then((res) => {
        dispatch(setDetailMovieRating(res.data.maPhim));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDetailMovieRatingLikesMockApi = (
  maPhim,
  taiKhoan,
  taiKhoanThich
) => {
  return (dispatch) => {
    connector({
      url: "http://5f1d781039d95a0016954056.mockapi.io/api/liked-rating",
      method: "GET",
    })
      .then((res) => {
        const index = res.data.findIndex(
          (rating) => rating.maPhim === maPhim && rating.taiKhoan === taiKhoan
        );

        if (index === -1 && taiKhoanThich) {
          return connector({
            url: "http://5f1d781039d95a0016954056.mockapi.io/api/liked-rating",
            method: "POST",
            data: {
              maPhim,
              taiKhoan,
              taiKhoanThich: [taiKhoanThich],
            },
          });
        }

        if (!taiKhoanThich) return;
        let likedAccounts = res.data[index].taiKhoanThich;
        if (!likedAccounts) likedAccounts = [];
        if (!likedAccounts.includes(taiKhoanThich)) {
          likedAccounts.push(taiKhoanThich);
        } else {
          const likedAccountIndex = likedAccounts.findIndex(
            (account) => account === taiKhoanThich
          );
          likedAccounts.splice(likedAccountIndex, 1);
        }
        console.log("likedAccounts: ", likedAccounts);

        return connector({
          url: `http://5f1d781039d95a0016954056.mockapi.io/api/liked-rating/${res.data[index].rating_id}`,
          method: "PUT",
          data: {
            maPhim,
            taiKhoan,
            taiKhoanThich: likedAccounts.length ? likedAccounts : null,
          },
        });
      })
      .then(() => {
        dispatch(setDetailMovieRatingLikes(taiKhoan, maPhim));
      })
      .catch((err) => {
        console.log(err);
      });
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

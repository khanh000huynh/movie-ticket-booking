import {
  SET_FINISHED_LOADING_MOVIES,
  SET_MISSING_INFO,
  SET_MOVIE,
  SET_MOVIE_INFO,
  SET_SHOWING,
  SET_SHOWTIME,
} from "../actions/actionTypes";

let initialState = {
  isLoading: null,
  movieList: [],
  movieInfo: {
    isShowingList: [],
    willBeShownList: [],
  },
  missingInfo: [],
  showing: [],
  showtime: [],
};

export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FINISHED_LOADING_MOVIES: {
      return { ...state, isLoading: payload };
    }
    case SET_MOVIE: {
      return { ...state, movieList: payload };
    }
    case SET_MOVIE_INFO: {
      const clone = { ...state.movieInfo };
      if (
        payload &&
        payload.lichChieu &&
        payload.lichChieu.length &&
        !clone.isShowingList.includes(payload.maPhim)
      ) {
        delete payload.lichChieu;
        clone.isShowingList.push(payload);
      }
      if (
        payload &&
        payload.lichChieu &&
        !payload.lichChieu.length &&
        !clone.willBeShownList.includes(payload.maPhim)
      ) {
        delete payload.lichChieu;
        clone.willBeShownList.push(payload);
      }
      return {
        ...state,
        movieInfo: clone,
      };
    }
    case SET_MISSING_INFO: {
      const { maPhim, heThongRapChieu } = payload;
      if (
        !heThongRapChieu[0] ||
        !heThongRapChieu[0].cumRapChieu[0] ||
        !heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0] ||
        !heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong
      )
        return state;
      const result = {
        maPhim,
        thoiLuong: heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong,
      };
      const cloneMissingInfo = [...state.missingInfo];
      if (!cloneMissingInfo.filter((info) => info.maPhim === maPhim).length)
        cloneMissingInfo.push(result);
      return { ...state, missingInfo: cloneMissingInfo };
    }
    case SET_SHOWING: {
      return { ...state, showing: [...payload] };
    }
    case SET_SHOWTIME: {
      const clone = [...state.showtime];
      clone.push(payload);
      return { ...state, showtime: clone };
    }
    default:
      return state;
  }
};

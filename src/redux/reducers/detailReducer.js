import {
  SET_DETAIL_MOVIE,
  SET_DETAIL_SHOWDATE,
  SET_DETAIL_SHOWTIME,
  SET_DETAIL_THEATER_LIST,
} from "../actions/actionTypes";

let initialState = {
  detailMovie: {},
  detailShowDate: "",
  detailTheaterList: [],
  detailShowtime: [],
};

export const detailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DETAIL_MOVIE: {
      return {
        ...state,
        detailMovie: payload,
      };
    }
    case SET_DETAIL_SHOWDATE: {
      return { ...state, detailShowDate: payload };
    }
    case SET_DETAIL_SHOWTIME: {
      const clone = [...state.detailShowtime];
      clone.push(payload);
      return { ...state, detailShowtime: clone };
    }
    case SET_DETAIL_THEATER_LIST: {
      return { ...state, detailTheaterList: payload };
    }
    default:
      return state;
  }
};

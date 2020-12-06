import {
  SET_MOVIE,
  SET_MOVIE_RATING,
  SET_SHOWING,
  SET_SHOWTIME,
} from "../actions/actionTypes";

let initialState = {
  movieList: [],
  movieRating: [],
  missingInfo: [],
  showing: [],
  showtime: [],
};

export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MOVIE: {
      return { ...state, movieList: payload };
    }
    case SET_MOVIE_RATING: {
      const clone = [...state.movieRating];
      clone.push(payload);
      return { ...state, movieRating: clone };
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

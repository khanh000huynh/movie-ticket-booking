import {
  CHOOSE_THEATER,
  CHOOSE_THEATER_SYSTEM,
  SET_THEATER_LIST,
  SET_THEATER_SYSTEM,
} from "../actions/actionTypes";

let initialState = {
  chosenTheaterSystem: {},
  chosenTheater: {},
  theaterSystem: [],
  theaterList: [],
};

export const theaterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHOOSE_THEATER_SYSTEM: {
      return {
        ...state,
        chosenTheaterSystem: payload,
      };
    }
    case CHOOSE_THEATER: {
      return { ...state, chosenTheater: payload };
    }
    case SET_THEATER_SYSTEM: {
      return { ...state, theaterSystem: payload };
    }
    case SET_THEATER_LIST: {
      const cloneTheaterList = [...state.theaterList];
      const maHeThongRapList = cloneTheaterList.map(
        (theater) => theater.maHeThongRap
      );
      if (!maHeThongRapList.includes(payload.maHeThongRap))
        cloneTheaterList.push(payload);
      return { ...state, theaterList: cloneTheaterList };
    }
    default:
      return state;
  }
};

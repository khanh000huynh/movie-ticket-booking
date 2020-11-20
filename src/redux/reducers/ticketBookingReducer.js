import {
  SET_CHOSEN_CHAIR_LIST,
  SET_CHOSEN_CHAIR_LIST_TO_EMPTY,
  SET_PROCESS,
  SET_TICKET_INFO,
} from "../actions/actionTypes";

let initialState = {
  movieInfo: {},
  chairList: [],
  chosenChairList: [],
  process: 0,
};

export const ticketBookingReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_PROCESS: {
      return { ...state, process: payload };
    }
    case SET_TICKET_INFO: {
      return {
        ...state,
        movieInfo: payload.thongTinPhim,
        chairList: payload.danhSachGhe,
      };
    }
    case SET_CHOSEN_CHAIR_LIST: {
      const clone = [...state.chosenChairList];
      const gheIndex = clone.findIndex((ghe) => ghe.maGhe === payload.maGhe);
      if (gheIndex === -1) clone.push(payload);
      else clone.splice(gheIndex, 1);
      return { ...state, chosenChairList: clone };
    }
    case SET_CHOSEN_CHAIR_LIST_TO_EMPTY: {
      return { ...state, chosenChairList: [] };
    }
    default:
      return state;
  }
};

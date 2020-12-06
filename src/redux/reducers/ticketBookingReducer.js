import {
  SET_BOOKING_HISTORY,
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
  history: [],
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
    case SET_BOOKING_HISTORY: {
      console.log(payload);
      const history = payload.thongTinDatVe.map((thongTin) => {
        const chairList = [];
        thongTin.danhSachGhe.forEach((ghe) => {
          chairList.push(ghe.tenGhe);
        });
        const otherBookingInfo = {
          rap:
            thongTin.danhSachGhe[0].tenHeThongRap +
            ` (${thongTin.danhSachGhe[0].tenCumRap})`,
          tenPhim: thongTin.tenPhim,
          giaVe: thongTin.giaVe,
          ngayDat: thongTin.ngayDat,
        };
        return { danhSachGhe: chairList, ...otherBookingInfo };
      });
      return { ...state, history: history };
    }
    default:
      return state;
  }
};

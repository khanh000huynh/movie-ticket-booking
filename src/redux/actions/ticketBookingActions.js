import connector from "../../configs/connector";
import { toDMY } from "../../utils/showDate";
import { convert } from "../../utils/showtime";
import { createAction } from "./actionCreator";
import {
  SET_BOOKING_HISTORY,
  SET_CHOSEN_CHAIR_LIST,
  SET_CHOSEN_CHAIR_LIST_TO_EMPTY,
  SET_PROCESS,
  SET_TICKET_INFO,
} from "./actionTypes";

export const setProcess = (current) => {
  return (dispatch) => {
    dispatch(createAction(SET_PROCESS, current + 1));
  };
};

export const setChosenChairList = (chair) => {
  return (dispatch) => {
    dispatch(createAction(SET_CHOSEN_CHAIR_LIST, chair));
  };
};

export const setChosenChairListToEmpty = () => {
  return (dispatch) => {
    dispatch(createAction(SET_CHOSEN_CHAIR_LIST_TO_EMPTY));
  };
};

export const setTicketBookingInfo = (maLichChieu, ngayChieuGioChieu) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      method: "GET",
    })
      .then((res) => {
        const thongTinPhim = { ...res.data.thongTinPhim };
        thongTinPhim.ngayChieu = toDMY(ngayChieuGioChieu);
        thongTinPhim.gioChieu = convert(ngayChieuGioChieu);
        dispatch(createAction(SET_TICKET_INFO, { ...res.data, thongTinPhim }));
      })
      .catch((err) => console.log(err));
  };
};

export const setBookingHistory = (taiKhoan) => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
      data: { taiKhoan },
    }).then((res) => {
      dispatch(createAction(SET_BOOKING_HISTORY, res.data));
    });
  };
};

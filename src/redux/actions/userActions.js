import connector from "../../configs/connector";
import { createAction } from "../actions/actionCreator";
import {
  SET_IS_LOGGING_IN,
  SET_IS_SIGNING_UP,
  SET_SEARCHED_USER,
  SET_USER_LOGIN,
} from "./actionTypes";

export const findUser = (keyword) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_SEARCHED_USER, res.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logIn = (user) => {
  return (dispatch) => {
    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    })
      .then((res) => {
        if (res.data.maLoaiNguoiDung === "KhachHang") {
          dispatch(createAction(SET_USER_LOGIN, res.data));
          delete res.data.matKhau;
          localStorage.setItem("credentials", JSON.stringify(res.data));
        }
        dispatch(createAction(SET_IS_LOGGING_IN, false));
      })
      .catch(() => {
        alert("Tài khoản hoặc mật khẩu không đúng!");
        dispatch(createAction(SET_IS_LOGGING_IN, false));
      });
  };
};

export const signUp = (user) => {
  return (dispatch) => {
    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data: user,
    })
      .then(() => {
        alert("Đăng ký thành công!");
        dispatch(createAction(SET_IS_SIGNING_UP, false));
      })
      .catch((error) => {
        alert(error.response.data);
        dispatch(createAction(SET_IS_SIGNING_UP, false));
      });
  };
};

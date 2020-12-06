import connector from "../../configs/connector";
import { setMessageBox } from "../../redux/actions/pageAction";
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
          setTimeout(() => {
            dispatch(createAction(SET_USER_LOGIN, res.data));
            delete res.data.matKhau;
            localStorage.setItem("credentials", JSON.stringify(res.data));
            dispatch(createAction(SET_IS_LOGGING_IN, false));
          }, 1500);
        }
      })
      .catch(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: "Tài khoản hoặc mật khẩu không đúng!",
            type: "warning",
          })
        );
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
        dispatch(
          setMessageBox({
            isOpened: true,
            message: "Đăng ký thành công!",
            type: "success",
          })
        );
        dispatch(createAction(SET_IS_SIGNING_UP, false));
      })
      .catch((error) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: error.response.data,
            type: "error",
          })
        );
        dispatch(createAction(SET_IS_SIGNING_UP, false));
      });
  };
};

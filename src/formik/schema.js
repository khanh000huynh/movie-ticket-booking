import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .required("Tài khoản không được để trống!")
    .min(3, "Tài khoản phải có ít nhất 3 kí tự!")
    .max(30, "Tài khoản không quá 30 kí tự!"),
  matKhau: Yup.string().required("Mật khẩu không được để trống!"),
});

export const SignUpSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .required("Tài khoản không được để trống!")
    .min(3, "Tài khoản phải có ít nhất 3 kí tự!")
    .max(30, "Tài khoản không quá 30 kí tự!"),
  matKhau: Yup.string().required("Mật khẩu không được để trống!"),
  email: Yup.string()
    .required("Email không được để trống!")
    .email("Email không hợp lệ!"),
  soDt: Yup.string().required("SĐT không được để trống!"),
  hoTen: Yup.string()
    .required("Họ tên không được để trống!")
    .max(40, "Họ tên không quá 40 kí tự!"),
});

export const BookTicketSchema = Yup.object().shape({
  maLichChieu: Yup.number().required("nope"),
  danhSachVe: Yup.array().required("nope"),
  taiKhoanNguoiDung: Yup.string().required("nope"),
});

export const MovieRatingSchema = Yup.object().shape({
  comment: Yup.string()
    .min(25, "Bình luận phải có ít nhất 25 kí tự!")
    .required("Bình luận không được để trống!"),
});

import firebase from "firebase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseConfig } from "../../base";
import LogInForm from "../../components/LogInForm/LogInForm";
import connector from "../../configs/connector";
import { DangNhap } from "../../models/DangNhap";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_USER_LOGIN } from "../../redux/actions/actionTypes";
import { findUser } from "../../redux/actions/userActions";
import WithHeaderAndFooter from "../WithHeaderAndFooter/WithHeaderAndFooter";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    picture: "",
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    isLoggedIn: false,
  });
  const foundUser = useSelector((state) => state.user.foundUser);
  const hasAccount = React.useMemo(() => {
    if (!state.isLoggedIn || !foundUser.taiKhoan) return;
    return !!(foundUser.taiKhoan !== "not_found");
  }, [state.isLoggedIn, foundUser.taiKhoan]);

  const logInWithSocialNetwork = React.useCallback(
    (DangNhap) => {
      connector({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: DangNhap,
      }).then((res) => {
        res.data.picture = state.picture;
        dispatch(createAction(SET_USER_LOGIN, res.data));
        localStorage.setItem("credentials", JSON.stringify(res.data));
      });
    },
    [state.picture, dispatch]
  );

  const signUpWithSocialNetwork = React.useCallback(() => {
    const clone = { ...state };
    delete clone.picture;
    delete clone.isLoggedIn;

    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data: clone,
    })
      .then((res) => {
        console.log("Dang ky thanh cong! ", res.data);
        logInWithSocialNetwork(
          DangNhap(res.data.taiKhoan, btoa(res.data.matKhau))
        );
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }, [state, logInWithSocialNetwork]);

  const authHandler = React.useCallback(
    async (authData) => {
      const { user, additionalUserInfo } = authData;
      sessionStorage.setItem(
        "additionalUserInfo",
        JSON.stringify(additionalUserInfo)
      );
      const profileId = additionalUserInfo.profile.id;
      setState({
        picture: additionalUserInfo.profile.picture.data.url,
        taiKhoan: profileId,
        matKhau: btoa(profileId),
        hoTen: user.displayName,
        email: `fb:${user.email}`,
        soDT: user.phoneNumber,
        maNhom: "GP01",
        maLoaiNguoiDung: "KhachHang",
        isLoggedIn: true,
      });
      dispatch(findUser(profileId.toString()));
    },
    [dispatch]
  );

  const authenticate = React.useCallback(
    (provider) => {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      firebaseConfig.auth().signInWithPopup(authProvider).then(authHandler);
    },
    [authHandler]
  );

  // const logOut = React.useCallback(async () => {
  //   await firebase.auth().signOut();
  //   setState({
  //     picture: "",
  //     taiKhoan: "",
  //     hoTen: "",
  //     email: "",
  //     soDT: "",
  //     maNhom: "",
  //     maLoaiNguoiDung: "KhachHang",
  //     isLoggedIn: false,
  //   });
  // }, []);

  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  React.useEffect(() => {
    if (hasAccount === undefined) return;
    if (hasAccount)
      logInWithSocialNetwork(DangNhap(state.taiKhoan, state.matKhau));
    else signUpWithSocialNetwork();
  }, [
    hasAccount,
    logInWithSocialNetwork,
    state.taiKhoan,
    state.matKhau,
    signUpWithSocialNetwork,
  ]);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const additionalUserInfo = JSON.parse(
        sessionStorage.getItem("additionalUserInfo")
      );
      if (!additionalUserInfo) return;
      if (user) authHandler({ user, additionalUserInfo });
    });
  }, [authHandler]);

  return (
    <WithHeaderAndFooter>
      <LogInForm authenticate={authenticate} />
    </WithHeaderAndFooter>
  );
};

export default LoginPage;

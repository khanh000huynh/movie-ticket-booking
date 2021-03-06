import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MessageBox from "./components/MessageBox/MessageBox";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BookingHistoryPage from "./pages/BookingHistoryPage/BookingHistoryPage";
import BookingResult from "./pages/BookingResult/BookingResult";
import BookTicketPage from "./pages/BookTicketPage/BookTicketPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { createAction } from "./redux/actions/actionCreator";
import { SET_USER_LOGIN } from "./redux/actions/actionTypes";

function App() {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.page.messageBox);

  React.useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials)
      dispatch(createAction(SET_USER_LOGIN, JSON.parse(credentials)));
  }, [dispatch]);

  return (
    <BrowserRouter>
      {messageBox && (
        <MessageBox message={messageBox.message} type={messageBox.type} />
      )}
      <ScrollToTop />
      <Switch>
        <Route path="/phim/:maPhim" component={DetailPage} />
        <Route path="/dangnhap" component={LoginPage} />
        <Route path="/dangky" component={SignUpPage} />
        <PrivateRoute
          path="/muave/ketqua/:maLichChieu"
          component={BookingResult}
        />
        <PrivateRoute path="/muave/:maLichChieu" component={BookTicketPage} />
        <PrivateRoute
          path="/lich-su-dat-ve/:taiKhoan"
          component={BookingHistoryPage}
        />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

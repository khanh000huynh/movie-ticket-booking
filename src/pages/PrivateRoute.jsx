import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const { path, component } = props;
  const user = useSelector((state) => state.user.credentials);
  const userFromLocalStorage = localStorage.getItem("credentials");

  return (
    <div>
      {user.accessToken || userFromLocalStorage ? (
        <Route path={path} component={component} />
      ) : (
        <Redirect to="/dangNhap" />
      )}
    </div>
  );
};

export default PrivateRoute;

import {
  SET_IS_LOGGING_IN,
  SET_IS_SIGNING_UP,
  SET_SEARCHED_USER,
  SET_USER_LOGIN,
} from "../actions/actionTypes";

let initialState = {
  credentials: {},
  isLoggingIn: false,
  isSigningUp: false,
  foundUser: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LOGIN: {
      return { ...state, credentials: payload };
    }
    case SET_IS_LOGGING_IN: {
      return { ...state, isLoggingIn: payload };
    }
    case SET_IS_SIGNING_UP: {
      return { ...state, isSigningUp: payload };
    }
    case SET_SEARCHED_USER: {
      return {
        ...state,
        foundUser: payload ? payload : { taiKhoan: "not_found" },
      };
    }
    default:
      return state;
  }
};

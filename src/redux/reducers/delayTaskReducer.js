import { SET_DELAY_TASK } from "../actions/actionTypes";

let initialState = {};

export const delayTaskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DELAY_TASK: {
      return { ...payload };
    }
    default:
      return state;
  }
};

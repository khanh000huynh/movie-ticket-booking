import { createAction } from "./actionCreator";
import { SET_DELAY_TASK } from "./actionTypes";

export const setDelayTask = (task) => {
  return (dispatch) => dispatch(createAction(SET_DELAY_TASK, task));
};

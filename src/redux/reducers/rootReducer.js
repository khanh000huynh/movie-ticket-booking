import { combineReducers } from "redux";
import { delayTaskReducer } from "./delayTaskReducer";
import { detailReducer } from "./detailReducer";
import { movieReducer } from "./movieReducer";
import { pageReducer } from "./pageReducer";
import { theaterReducer } from "./theaterReducer";
import { ticketBookingReducer } from "./ticketBookingReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  theater: theaterReducer,
  movie: movieReducer,
  detail: detailReducer,
  ticketBookingInfo: ticketBookingReducer,
  user: userReducer,
  delayTask: delayTaskReducer,
  page: pageReducer,
});

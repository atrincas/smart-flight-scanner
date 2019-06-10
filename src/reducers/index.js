import { combineReducers } from "redux";

import fetchAirportsReducer from "./fetchAirportsReducer";
import searchFormReducer from "./searchFormReducer";

export default combineReducers({
  airports: fetchAirportsReducer,
  searchQueries: searchFormReducer
});

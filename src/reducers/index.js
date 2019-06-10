import { combineReducers } from "redux";

import fetchAirportsReducer from "./fetchAirportsReducer";
import fetchFlightOffersReducer from "./fetchFlightOffersReducer";
import searchFormReducer from "./searchFormReducer";

export default combineReducers({
  airports: fetchAirportsReducer,
  flightOffers: fetchFlightOffersReducer,
  searchQueries: searchFormReducer
});

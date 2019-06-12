import { combineReducers } from "redux";

import fetchAirportsReducer from "./fetchAirportsReducer";
import fetchFlightOffersReducer from "./fetchFlightOffersReducer";
import searchFormReducer from "./searchFormReducer";
import getFinalFlightOffersReducer from "./getFinalFlightOffersReducer";

export default combineReducers({
  airports: fetchAirportsReducer,
  flightOffers: fetchFlightOffersReducer,
  searchQueries: searchFormReducer,
  finalFlightOffers: getFinalFlightOffersReducer
});

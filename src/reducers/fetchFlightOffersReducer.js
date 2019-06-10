import {
  FETCH_FLIGHT_OFFERS_REQUEST,
  FETCH_FLIGHT_OFFERS_SUCCES
} from "../actions/types";

const initialState = {
  isFetching: true,
  flightOffers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHT_OFFERS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_FLIGHT_OFFERS_SUCCES:
      return { ...state, isFetching: false, flightOffers: action.payload };
    default:
      return state;
  }
};

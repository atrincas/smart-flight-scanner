import {
  FETCH_FLIGHT_OFFERS_REQUEST,
  FETCH_FLIGHT_OFFERS_SUCCES,
  FETCH_FLIGHT_OFFERS_FAILED
} from "../actions/types";

const initialState = {
  isFetching: true,
  flightOffers: [],
  errorCode: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHT_OFFERS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_FLIGHT_OFFERS_SUCCES:
      return { ...state, isFetching: false, flightOffers: action.payload };
    case FETCH_FLIGHT_OFFERS_FAILED:
      return { ...state, isFetching: false, errorCode: action.payload };
    default:
      return state;
  }
};

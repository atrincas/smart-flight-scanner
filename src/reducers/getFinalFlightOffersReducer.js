import { GET_FINAL_FLIGHT_OFFERS } from "../actions/types";

const initialState = {
  finalFlightOffers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FINAL_FLIGHT_OFFERS:
      return { ...state, finalFlightOffers: action.payload };
    default:
      return state;
  }
};

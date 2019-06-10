import {
  FETCH_AIRPORTS_REQUEST,
  FETCH_AIRPORTS_SUCCES
} from "../actions/types";

const initialState = {
  isFetching: true,
  airports: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AIRPORTS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_AIRPORTS_SUCCES:
      return { ...state, isFetching: false, airports: action.payload };
    default:
      return state;
  }
};

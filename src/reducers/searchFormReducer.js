import {
  ADJUST_FROM,
  ADJUST_MIN_TRAVELTIME,
  ADJUST_MAX_TRAVELTIME,
  ADJUST_START_PERIOD,
  ADJUST_END_PERIOD,
  ADJUST_OVERNIGHT_STAY
} from "../actions/types";

const initialState = {
  from: "",
  minTravelTime: 0,
  maxTravelTime: 10,
  startPeriod: "2019/07/02",
  endPeriod: "2019/07/28",
  overnightStay: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADJUST_FROM:
      return {
        ...state,
        from: action.value
      };
    case ADJUST_MIN_TRAVELTIME:
      return {
        ...state,
        minTravelTime: action.value
      };
    case ADJUST_MAX_TRAVELTIME:
      return {
        ...state,
        maxTravelTime: action.value
      };
    case ADJUST_START_PERIOD:
      return {
        ...state,
        startPeriod: action.value
      };
    case ADJUST_END_PERIOD:
      return {
        ...state,
        endPeriod: action.value
      };
    case ADJUST_OVERNIGHT_STAY:
      return {
        ...state,
        overnightStay: action.value
      };
    default:
      return state;
  }
};

import {
  ADJUST_FROM,
  ADJUST_MIN_TRAVELTIME,
  ADJUST_MAX_TRAVELTIME,
  ADJUST_START_PERIOD,
  ADJUST_END_PERIOD,
  ADJUST_OVERNIGHT_STAYS
} from "../types";

export const changeAirportValue = value => {
  return { type: ADJUST_FROM, value };
};

export const adjustMinTravelTime = value => {
  return { type: ADJUST_MIN_TRAVELTIME, value };
};

export const adjustMaxTravelTime = value => {
  return { type: ADJUST_MAX_TRAVELTIME, value };
};

export const adjustStartPeriod = value => {
  return { type: ADJUST_START_PERIOD, value };
};

export const adjustEndPeriod = value => {
  return { type: ADJUST_END_PERIOD, value };
};

export const adjustOvernightStays = value => {
  return { type: ADJUST_OVERNIGHT_STAYS, value };
};

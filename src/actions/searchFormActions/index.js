import {
  ADJUST_FROM,
  ADJUST_MIN_TRAVELTIME,
  ADJUST_MAX_TRAVELTIME,
  ADJUST_START_PERIOD,
  ADJUST_END_PERIOD,
  ADJUST_OVERNIGHT_STAY
} from "../types";

export const changeAirportValue = value => {
  return { type: ADJUST_FROM, value };
};

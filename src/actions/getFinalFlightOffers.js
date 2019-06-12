import { GET_FINAL_FLIGHT_OFFERS } from "./types";

export const getFinalFlightOffers = payload => {
  return { type: GET_FINAL_FLIGHT_OFFERS, payload };
};

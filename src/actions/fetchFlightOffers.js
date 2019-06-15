import axios from "axios";
import {
  FETCH_FLIGHT_OFFERS_REQUEST,
  FETCH_FLIGHT_OFFERS_SUCCES,
  FETCH_FLIGHT_OFFERS_FAILED
} from "./types";

const fetchFightOffersRequest = () => {
  return { type: FETCH_FLIGHT_OFFERS_REQUEST };
};
const fetchFlightOffersResult = data => {
  return { type: FETCH_FLIGHT_OFFERS_SUCCES, payload: data };
};

const fetchFlightOffersFailed = data => {
  return { type: FETCH_FLIGHT_OFFERS_FAILED, payload: data };
};

export const fetchFlightOffers = queries => {
  const key = process.env.REACT_APP_API_KEY;
  const param = queries;
  const config = {
    method: "get",
    url: "https://api.transavia.com/v1/flightoffers/",
    params: {
      Origin: param["Origin"],
      OriginDepartureDate: param["OriginDepartureDate"],
      OriginArrivalDate: param["OriginArrivalDate"],
      DaysAtDestination: param["DaysAtDestination"]
    },
    headers: { apikey: key }
  };
  return async function(dispatch) {
    try {
      dispatch(fetchFightOffersRequest());
      const response = await axios(config);
      dispatch(fetchFlightOffersResult(response.data.flightOffer));
    } catch (error) {
      dispatch(fetchFlightOffersFailed(error.response.status));
    }
  };

  // async dispatch => {
  //   dispatch(fetchFightOffersRequest());
  //   const response = await axios(config);
  //   console.log(response);
  //   dispatch(fetchFlightOffersResult(response.data.flightOffer));
  // };
};

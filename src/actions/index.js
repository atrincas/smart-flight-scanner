import axios from "axios";
import { FETCH_AIRPORTS_REQUEST, FETCH_AIRPORTS_SUCCES } from "./types";

const fetchAirportsRequest = () => {
  return { type: FETCH_AIRPORTS_REQUEST };
};
const fetchAirportsResult = data => {
  return { type: FETCH_AIRPORTS_SUCCES, payload: data };
};

export const fetchAirports = dispatch => {
  const key = process.env.REACT_APP_API_KEY;
  const config = {
    method: "get",
    url: "https://api.transavia.com/v2/airports/",
    headers: { apikey: key }
  };
  return async dispatch => {
    dispatch(fetchAirportsRequest());
    const response = await axios(config);
    dispatch(fetchAirportsResult(response.data));
  };
};

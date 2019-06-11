import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFlightOffers } from "../actions/fetchFlightOffers";

import SelectAirport from "./SelectAirport";
import SelectTravelTime from "./SelectTravelTime";
import SelectPeriod from "./SelectPeriod";
import SelectStay from "./SelectStay";
import FlightOffers from "./FlightOffers";

import {
  Header,
  FormContainer,
  FormRow,
  Form,
  FormButton
} from "../styled/Lib";

import { filterFlightOffers, convertQueries } from "../utils";

function SearchForm() {
  const [startSearch, setStartSearch] = useState(false);
  const [finalFlightOffers, setFinalFlightOffers] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const queries = useSelector(state => state.searchQueries);
  const flightOffers = useSelector(state => state.flightOffers.flightOffers);
  const dispatch = useDispatch();
  const getFlightOffers = useCallback(
    values => dispatch(fetchFlightOffers(values)),
    [dispatch]
  );

  useEffect(() => {
    if (typeof flightOffers !== "undefined" && flightOffers.length > 0) {
      let final = filterFlightOffers(
        flightOffers,
        queries["minTravelTime"],
        queries["maxTravelTime"]
      );
      setFinalFlightOffers(final);
    } else if (typeof flightOffers === "undefined") {
      setNoSearchResults(true);
    }
  }, [flightOffers]);

  const handleSearch = e => {
    e.preventDefault();
    setStartSearch(true);
    const convertedQueries = convertQueries(queries);
    console.log(convertedQueries);
    getFlightOffers(convertedQueries);
  };
  return (
    <>
      <Header>
        <FormContainer>
          <Form onSubmit={handleSearch}>
            <FormRow>
              <SelectAirport />
            </FormRow>
            <FormRow>
              <SelectTravelTime />
            </FormRow>
            <FormRow>
              <SelectPeriod />
            </FormRow>
            <FormRow>
              <SelectStay />
            </FormRow>
            <FormRow>
              <FormButton />
            </FormRow>
          </Form>
        </FormContainer>
      </Header>
      {startSearch ? (
        <FlightOffers
          offers={finalFlightOffers}
          noSearchResults={noSearchResults}
        />
      ) : null}
    </>
  );
}

export default SearchForm;

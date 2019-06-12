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
import { getFinalFlightOffers } from "../actions/getFinalFlightOffers";

function SearchForm() {
  const [startSearch, setStartSearch] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const queries = useSelector(state => state.searchQueries);
  const flightOffers = useSelector(state => state.flightOffers.flightOffers);
  const finalFlightOffers = useSelector(
    state => state.finalFlightOffers.finalFlightOffers
  );
  const dispatch = useDispatch();
  const getFlightOffers = useCallback(
    values => dispatch(fetchFlightOffers(values)),
    [dispatch]
  );
  const dipatchFinalFlightOffers = useCallback(
    values => dispatch(getFinalFlightOffers(values)),
    [dispatch]
  );

  useEffect(() => {
    if (typeof flightOffers !== "undefined" && flightOffers.length > 0) {
      let final = filterFlightOffers(
        flightOffers,
        queries["minTravelTime"],
        queries["maxTravelTime"]
      );
      dipatchFinalFlightOffers(final);
    }
  }, [flightOffers]);

  useEffect(() => {
    if (startSearch && !finalFlightOffers.length) {
      debugger;
      setNoSearchResults(true);
    }
  }, [finalFlightOffers]);

  const handleSearch = e => {
    e.preventDefault();
    setNoSearchResults(false);
    setStartSearch(true);
    const convertedQueries = convertQueries(queries);
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
      {startSearch ? <FlightOffers noSearchResults={noSearchResults} /> : null}
    </>
  );
}

export default SearchForm;

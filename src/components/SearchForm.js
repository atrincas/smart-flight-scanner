import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { fetchFlightOffers } from "../actions/fetchFlightOffers";
import { FETCH_FLIGHT_OFFERS_FAILED } from "../actions/types";

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
  FormButton,
  AlertText
} from "../styled/Lib";

import { filterFlightOffers, convertQueries } from "../utils";
import { getFinalFlightOffers } from "../actions/getFinalFlightOffers";

function SearchForm() {
  const [startSearch, setStartSearch] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [showAlertText, setShowAlertText] = useState(false);
  const updatedOvernightStays = useSelector(
    state => state.searchQueries.overnightStay,
    shallowEqual
  );
  const updatedEndDate = useSelector(
    state => state.searchQueries.endPeriod,
    shallowEqual
  );
  const updatedStartDate = useSelector(
    state => state.searchQueries.startPeriod,
    shallowEqual
  );
  const queries = useSelector(state => state.searchQueries);
  const errorCode = useSelector(state => state.flightOffers.errorCode);
  const flightOffers = useSelector(state => state.flightOffers.flightOffers);
  const finalFlightOffers = useSelector(
    state => state.finalFlightOffers.finalFlightOffers
  );
  const dispatch = useDispatch();
  const resetErrorCode = useCallback(
    value => dispatch({ type: FETCH_FLIGHT_OFFERS_FAILED, payload: 0 }),
    [dispatch]
  );
  const getFlightOffers = useCallback(
    values => dispatch(fetchFlightOffers(values)),
    [dispatch]
  );
  const dipatchFinalFlightOffers = useCallback(
    values => dispatch(getFinalFlightOffers(values)),
    [dispatch]
  );

  useEffect(() => {
    if (updatedOvernightStays === 1) {
      setShowAlertText(false);
    } else {
      setShowAlertText(true);
    }
  }, [updatedOvernightStays, updatedStartDate]);

  useEffect(() => {
    setShowAlertText(false);
  }, [updatedEndDate]);

  useEffect(() => {
    if (typeof flightOffers !== "undefined" && flightOffers.length > 0) {
      let final = filterFlightOffers(
        flightOffers,
        queries["minTravelTime"],
        queries["maxTravelTime"]
      );
      dipatchFinalFlightOffers(final);
      setIsloading(false);
    }
    if (typeof flightOffers === "undefined" || !flightOffers.length) {
      setNoSearchResults(true);
      setIsloading(false);
    }
  }, [flightOffers]);

  useEffect(() => {
    if (startSearch && !finalFlightOffers.length) {
      setNoSearchResults(true);
      setIsloading(false);
    }
  }, [finalFlightOffers]);

  useEffect(() => {
    if (errorCode === 400) {
      setNoSearchResults(true);
      setIsloading(false);
      resetErrorCode();
    }
  }, [errorCode]);

  const handleSearch = e => {
    e.preventDefault();
    setIsloading(true);
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
              {showAlertText ? (
                <AlertText>
                  Travel period has been changed! Adjust if necessary.
                </AlertText>
              ) : null}
            </FormRow>
            <FormRow>
              <FormButton />
            </FormRow>
          </Form>
        </FormContainer>
      </Header>
      {startSearch ? (
        <FlightOffers isLoading={isLoading} noSearchResults={noSearchResults} />
      ) : null}
    </>
  );
}

export default SearchForm;

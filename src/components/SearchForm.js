import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFlightOffers } from "../actions/fetchFlightOffers";

import SelectAirport from "./SelectAirport";
import SelectTravelTime from "./SelectTravelTime";
import SelectPeriod from "./SelectPeriod";
import SelectStay from "./SelectStay";
import FlightOffers from "./FlightOffers";

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 200px;
`;

function SearchForm() {
  const [startSearch, setStartSearch] = useState(false);
  const queries = useSelector(state => state.searchQueries);
  const dispatch = useDispatch();
  const getFlightOffers = useCallback(
    values => dispatch(fetchFlightOffers(values)),
    [dispatch]
  );

  const convertDate = date => {
    if (typeof date === "undefined") {
      return;
    }
    return date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("");
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const subDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const calcStartPeriodRange = (startDate, endDate, overnighStays) => {
    let start = startDate,
      end = subDays(endDate, overnighStays);
    return convertDate(start) + "-" + convertDate(end);
  };

  const calcEndPeriodRange = (startDate, endDate, overnighStays) => {
    // let start = addDays(startDate, overnighStays),
    //   end = endDate;
    return convertDate(startDate) + "-" + convertDate(endDate);
  };

  const convertQueries = queries => {
    // Prevent function from running if queries is undefined:
    if (typeof queries === "undefined") {
      return;
    }
    let newQueries = {};
    newQueries["Origin"] = queries["from"];
    newQueries["OriginDepartureDate"] = calcStartPeriodRange(
      queries["startPeriod"],
      queries["endPeriod"],
      queries["overnightStay"]
    );
    newQueries["OriginArrivalDate"] = calcEndPeriodRange(
      queries["startPeriod"],
      queries["endPeriod"],
      queries["overnightStay"]
    );
    newQueries["DaysAtDestination"] = queries["overnightStay"];
    return newQueries;
  };

  const handleSearch = e => {
    e.preventDefault();
    setStartSearch(true);
    const convertedQueries = convertQueries(queries);
    console.log(convertedQueries);
    getFlightOffers(convertedQueries);
  };
  return (
    <>
      <Form onSubmit={handleSearch}>
        <SelectAirport />
        <SelectTravelTime />
        <SelectPeriod />
        <SelectStay />
        <input type="submit" />
      </Form>
      {startSearch ? <FlightOffers /> : null}
    </>
  );
}

export default SearchForm;

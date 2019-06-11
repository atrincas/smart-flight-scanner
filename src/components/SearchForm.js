import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFlightOffers } from "../actions/fetchFlightOffers";

import SelectAirport from "./SelectAirport";
import SelectTravelTime from "./SelectTravelTime";
import SelectPeriod from "./SelectPeriod";
import SelectStay from "./SelectStay";
import FlightOffers from "./FlightOffers";

import { Header, FormContainer, FormRow, Form } from "../styled/Lib";

// Function to calculate the travel time of a flight:
function calcTravelTime(departure, arrival) {
  let dateDep = new Date(departure),
    dateArr = new Date(arrival);
  let travelTime = (dateArr - dateDep) / (1000 * 3600);

  return travelTime;
}

// Function to filter flight offers based on travel time:
function filterFlightOffers(flights, min, max) {
  let newList = [],
    oldList = flights;

  oldList.forEach(flightOffer => {
    let outboundDep = flightOffer["outboundFlight"]["departureDateTime"],
      outboundArr = flightOffer["outboundFlight"]["arrivalDateTime"],
      inboundDep = flightOffer["inboundFlight"]["departureDateTime"],
      inboundArr = flightOffer["inboundFlight"]["arrivalDateTime"];

    let outboundTime = calcTravelTime(outboundDep, outboundArr),
      inboundTime = calcTravelTime(inboundDep, inboundArr);

    if (
      outboundTime >= min &&
      inboundTime >= min &&
      outboundTime <= max &&
      inboundTime <= max
    ) {
      newList.push(flightOffer);
    }
  });

  console.log("old list", oldList);
  console.log("new list", newList);
  return newList;
}

function SearchForm() {
  const [startSearch, setStartSearch] = useState(false);
  const [finalFlightOffers, setFinalFlightOffers] = useState([]);
  const queries = useSelector(state => state.searchQueries);
  const flightOffers = useSelector(state => state.flightOffers.flightOffers);
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

  useEffect(() => {
    if (flightOffers.length > 0) {
      let final = filterFlightOffers(
        flightOffers,
        queries["minTravelTime"],
        queries["maxTravelTime"]
      );
      setFinalFlightOffers(final);
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
            <input type="submit" />
          </FormRow>
        </Form>
        {startSearch ? <FlightOffers offers={finalFlightOffers} /> : null}
      </FormContainer>
    </Header>
  );
}

export default SearchForm;

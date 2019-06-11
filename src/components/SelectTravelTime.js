import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  adjustMinTravelTime,
  adjustMaxTravelTime
} from "../actions/searchFormActions";

import { Select, FormGroup, FormLabel } from "../styled/Lib";

function SelectTravelTime() {
  const travelTimes = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const [mintravelTime, setMinTravelTime] = useState(0);
  const [maxtravelTime, setMaxTravelTime] = useState(5);
  const dispatch = useDispatch();
  const changeMinTravelTime = useCallback(
    value => dispatch(adjustMinTravelTime(value)),
    [dispatch]
  );
  const changeMaxTravelTime = useCallback(
    value => dispatch(adjustMaxTravelTime(value)),
    [dispatch]
  );

  const handleMinTravelTime = e => {
    setMinTravelTime(e.currentTarget.value);
    changeMinTravelTime(e.currentTarget.value);
  };

  const handleMaxTravelTime = e => {
    setMaxTravelTime(e.currentTarget.value);
    changeMaxTravelTime(e.currentTarget.value);
  };

  return (
    <>
      <FormGroup>
        <FormLabel>Minimum travel time (hours)</FormLabel>
        <Select value={mintravelTime} onChange={handleMinTravelTime}>
          {travelTimes.map((time, i) => (
            <option key={i} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <FormLabel>Maximum travel time (hours)</FormLabel>
        <Select value={maxtravelTime} onChange={handleMaxTravelTime}>
          {travelTimes.map((time, i) => (
            <option key={i} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </FormGroup>
    </>
  );
}

export default SelectTravelTime;

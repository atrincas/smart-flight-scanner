import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeAirportValue } from "../actions/searchFormActions";

function SelectAirport() {
  const airports = useSelector(state => state.airports.airports);
  const firstValue = airports[0].id;
  const [selectedAirport, setSelectedAirport] = useState(airports[0].name);
  const dispatch = useDispatch();
  const changeCurrentValue = useCallback(
    value => dispatch(changeAirportValue(value)),
    [dispatch]
  );

  useEffect(() => {
    // Get the airport-id from the first value in the airport array and dispatch it:
    changeCurrentValue(firstValue);
  }, [changeCurrentValue, firstValue]);

  const handleChange = e => {
    let selectedIndex = e.target.options.selectedIndex;
    let currentValue = e.target.options[selectedIndex].getAttribute("data-id");
    changeCurrentValue(currentValue);
    setSelectedAirport(e.currentTarget.value);
  };

  return (
    <label>
      From:
      <select value={selectedAirport} onChange={handleChange}>
        {airports.map(airport => (
          <option key={airport.id} data-id={airport.id} value={airport.name}>
            {airport.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectAirport;

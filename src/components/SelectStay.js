import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { adjustOvernightStays } from "../actions/searchFormActions";

function SelectStay() {
  const [overnightStays, setOvernightStays] = useState(0);
  const dispatch = useDispatch();
  const changeOvernightStays = useCallback(
    value => dispatch(adjustOvernightStays(value)),
    [dispatch]
  );

  const handleOvernightStays = e => {
    setOvernightStays(e.currentTarget.value);
    changeOvernightStays(e.currentTarget.value);
  };

  return (
    <>
      <label>Number of overnight stays:</label>
      <input
        type="number"
        min="0"
        max="300"
        value={overnightStays}
        onChange={handleOvernightStays}
      />
    </>
  );
}

export default SelectStay;

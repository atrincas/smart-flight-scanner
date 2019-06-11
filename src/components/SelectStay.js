import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { adjustOvernightStays } from "../actions/searchFormActions";

import { FormGroup, FormLabel, InputNumber } from "../styled/Lib";

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
    <FormGroup>
      <FormLabel>Number of overnight stays</FormLabel>
      <InputNumber
        type="number"
        min="0"
        max="300"
        value={overnightStays}
        onChange={handleOvernightStays}
      />
    </FormGroup>
  );
}

export default SelectStay;

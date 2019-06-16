import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { adjustOvernightStays } from "../actions/searchFormActions";

import { FormGroup, FormLabel, InputNumber } from "../styled/Lib";

function SelectStay({isError}) {
  const [overnightStays, setOvernightStays] = useState(1);
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
        style={isError ? {borderColor: 'red', outline: 'none'} : {}}
        type="number"
        min="1"
        max="300"
        value={overnightStays}
        onChange={handleOvernightStays}
      />
    </FormGroup>
  );
}

export default SelectStay;

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  adjustStartPeriod,
  adjustEndPeriod
} from "../actions/searchFormActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../styled/date-picker.css";
import styled from "styled-components";
import { FormGroup } from "../styled/Lib";

const LabelCalender = styled.label`
  display: block;
  top: 6px;
  padding-left: 20px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 24px;
  font-size: 12px;
  color: #98c9ee;
`;

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function SelectPeriod() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 2));
  const dispatch = useDispatch();
  const changeStartPeriod = useCallback(
    value => dispatch(adjustStartPeriod(value)),
    [dispatch]
  );
  const changeEndPeriod = useCallback(
    value => dispatch(adjustEndPeriod(value)),
    [dispatch]
  );

  const handleStartDate = date => {
    setStartDate(date);
    changeStartPeriod(date);
  };

  const handleEndDate = date => {
    setEndDate(date);
    changeEndPeriod(date);
  };

  useEffect(() => {
    changeStartPeriod(startDate);
  }, [changeStartPeriod]);

  useEffect(() => {
    changeEndPeriod(endDate);
  }, [changeEndPeriod]);

  return (
    <FormGroup>
      <LabelCalender>Select period of travel</LabelCalender>
      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={handleStartDate}
        dateFormat="dd/MM/yyy"
        className="calender"
      />{" "}
      <DatePicker
        placeholderText="End"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        onChange={handleEndDate}
        minDate={startDate}
        dateFormat="dd/MM/yyy"
        className="calender"
      />
    </FormGroup>
  );
}

export default SelectPeriod;

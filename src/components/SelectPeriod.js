import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  adjustStartPeriod,
  adjustEndPeriod
} from "../actions/searchFormActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SelectPeriod() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    <>
      <label>Startdate:</label>
      <DatePicker selected={startDate} onChange={handleStartDate} />
      <label>Enddate:</label>
      <DatePicker selected={endDate} onChange={handleEndDate} />
    </>
  );
}

export default SelectPeriod;

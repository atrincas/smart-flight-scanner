import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  adjustStartPeriod,
  adjustEndPeriod
} from "../actions/searchFormActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const convertDate = date => {
  return date
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("");
};
const initialStartDate = convertDate(new Date());
const initialEndDate = convertDate(new Date());

function SelectPeriod() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [convertedStartDate, setConvertedStartDate] = useState(
    initialStartDate
  );
  const [convertedEndDate, setConvertedEndDate] = useState(initialEndDate);
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
    let newDate = convertDate(date);
    setConvertedStartDate(newDate);
    changeStartPeriod(newDate);
  };

  const handleEndDate = date => {
    setEndDate(date);
    let newDate = convertDate(date);
    setConvertedEndDate(newDate);
    changeEndPeriod(newDate);
  };

  const convertDate = date => {
    return date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("");
  };

  useEffect(() => {
    changeStartPeriod(convertedStartDate);
  }, [changeStartPeriod]);

  useEffect(() => {
    changeEndPeriod(convertedEndDate);
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

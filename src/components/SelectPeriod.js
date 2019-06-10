import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SelectPeriod() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [convertedStartDate, setConvertedStartDate] = useState(null);
  const [convertedEndDate, setConvertedEndDate] = useState(null);

  const handleStartDate = date => {
    setStartDate(date);
  };

  const handleEndDate = date => {
    setEndDate(date);
  };

  const convertDate = date => {
    return date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .join("");
  };

  // Convert the selected date for data fetching:
  useEffect(() => {
    let newDate = convertDate(startDate);
    setConvertedStartDate(newDate);
  }, [startDate]);

  useEffect(() => {
    let newDate = convertDate(endDate);
    setConvertedEndDate(newDate);
  }, [endDate]);

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

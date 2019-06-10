import React, { useState } from "react";

function SelectStay() {
  const [overnightStays, setOvernightStays] = useState(0);

  const handleOvernightStays = e => {
    setOvernightStays(e.currentTarget.value);
  };

  return (
    <>
      <label>Number of overnight stays:</label>
      <input type="number" min="0" />
    </>
  );
}

export default SelectStay;

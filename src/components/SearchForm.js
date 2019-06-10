import React from "react";

import SelectAirport from "./SelectAirport";
import SelectTravelTime from "./SelectTravelTime";
import SelectPeriod from "./SelectPeriod";
import SelectStay from "./SelectStay";

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 200px;
`;

function SearchForm() {
  return (
    <>
      <Form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <SelectAirport />
        <SelectTravelTime />
        <SelectPeriod />
        <SelectStay />
        <input type="submit" />
      </Form>
    </>
  );
}

export default SearchForm;

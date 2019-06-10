import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  height: 100%;
  width: 282px;
  margin: 0 auto;
`;

const Input = styled.input.attrs({
  input: "text",
  placeholder: "Type to filter",
  autoComplete: "off"
})`
  width: 280px;
`;
const ListBoxContainer = styled.div`
  display: block;
  position: fixed;
  width: 280px;
  border: 1px solid #aaa;
  background-color: #fff;
  font-family: Open Sans, sans-serif;
  font-weight: 300;
  font-size: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
`;

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

function SelectAirport({ airports }) {
  const [userInput, setUserInput] = useState("");
  const [airportsList, setAirportsList] = useState(airports);

  const handleInput = e => {
    setUserInput(e.currentTarget.value);
  };

  const filterAirports = () => {
    const newAirportsList = airports.filter(airport => {
      return airport.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });
    setAirportsList(newAirportsList);
  };

  useEffect(() => {
    return () => {
      filterAirports();
    };
  }, [userInput]);

  return (
    <MainContainer>
      <Input onChange={handleInput} />
      <ListBoxContainer>
        <ListBox>
          {airportsList.map((airport, i) => (
            <li key={airport.id} data-sugestion-index={i}>
              {airport.name}
            </li>
          ))}
        </ListBox>
      </ListBoxContainer>
    </MainContainer>
  );
}

export default SelectAirport;

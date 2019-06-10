import React from "react";

const uuidv4 = require("uuid/v4");

function FlightOffers({ offers }) {
  return offers.length === 0 ? (
    <div>...Loading</div>
  ) : (
    <div>
      {offers.map(flightOffer => {
        return <div key={uuidv4()}>{flightOffer.outboundFlight.id}</div>;
      })}
    </div>
  );
}

export default FlightOffers;

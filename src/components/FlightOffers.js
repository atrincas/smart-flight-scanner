import React from "react";
import { useSelector } from "react-redux";

import {
  calcTravelTimeString,
  convertFlightDate,
  convertFlightTime,
  airportDetails
} from "../utils";

import {
  FlightOffersContainer,
  OrderByBar,
  FlightOffersUl,
  FlightOffersLi,
  TicketContainer,
  TicketDetails,
  FlightDetails,
  FlightInfo,
  FlightInfoDate,
  FlightInfoBlock,
  FlightInfoBlockHeader,
  FlightInfoBlockSubHeader,
  FlightDuration,
  LineUl,
  TicketPrice,
  TicketButton,
  PriceTitle
} from "../styled/Lib";

const uuidv4 = require("uuid/v4");

function FlightOffers({ isLoading, noSearchResults }) {
  const airports = useSelector(state => state.airports.airports);
  const offers = useSelector(
    state => state.finalFlightOffers.finalFlightOffers
  );
  return isLoading ? (
    <div>...Loading</div>
  ) : noSearchResults ? (
    <div>No Search Results!</div>
  ) : (
    <FlightOffersContainer>
      <OrderByBar>
        <div>
          <b>Order By</b>
        </div>
        <button>Date</button>
        <button>Price low-high</button>
        <button>Price high-low</button>
      </OrderByBar>
      <FlightOffersUl>
        {offers.map(flightOffer => {
          return (
            <FlightOffersLi key={uuidv4()}>
              <TicketContainer>
                <TicketDetails>
                  <FlightDetails>
                    <FlightInfo>
                      <FlightInfoDate>
                        <div>
                          {convertFlightDate(
                            flightOffer.outboundFlight.departureDateTime,
                            "month"
                          )}
                        </div>
                        <div>
                          {convertFlightDate(
                            flightOffer.outboundFlight.departureDateTime,
                            "day"
                          )}
                        </div>
                        <div>
                          {convertFlightDate(
                            flightOffer.outboundFlight.departureDateTime,
                            "year"
                          )}
                        </div>
                      </FlightInfoDate>
                      <FlightInfoBlock>
                        <FlightInfoBlockHeader>
                          <span className="flight-city">
                            {
                              flightOffer.outboundFlight.departureAirport
                                .locationCode
                            }
                          </span>{" "}
                          <span className="flight-time">
                            {convertFlightTime(
                              flightOffer.outboundFlight.departureDateTime
                            )}
                          </span>
                        </FlightInfoBlockHeader>
                        <FlightInfoBlockSubHeader>
                          {airportDetails(
                            airports,
                            flightOffer.outboundFlight.departureAirport
                              .locationCode,
                            "name"
                          )}
                          ,{" "}
                          {
                            airportDetails(
                              airports,
                              flightOffer.outboundFlight.departureAirport
                                .locationCode,
                              "country"
                            )["name"]
                          }
                        </FlightInfoBlockSubHeader>
                      </FlightInfoBlock>
                      <FlightDuration>
                        <span className="duration">
                          {calcTravelTimeString(
                            flightOffer.outboundFlight.departureDateTime,
                            flightOffer.outboundFlight.arrivalDateTime
                          )}
                        </span>
                        <LineUl />
                        <span className="title">Direct</span>
                      </FlightDuration>
                      <FlightInfoBlock>
                        <FlightInfoBlockHeader>
                          <span className="flight-city">
                            {
                              flightOffer.outboundFlight.arrivalAirport
                                .locationCode
                            }
                          </span>{" "}
                          <span className="flight-time">
                            {convertFlightTime(
                              flightOffer.outboundFlight.arrivalDateTime
                            )}
                          </span>
                        </FlightInfoBlockHeader>
                        <FlightInfoBlockSubHeader>
                          {airportDetails(
                            airports,
                            flightOffer.outboundFlight.arrivalAirport
                              .locationCode,
                            "name"
                          )}
                          ,{" "}
                          {
                            airportDetails(
                              airports,
                              flightOffer.outboundFlight.arrivalAirport
                                .locationCode,
                              "country"
                            )["name"]
                          }
                        </FlightInfoBlockSubHeader>
                      </FlightInfoBlock>
                    </FlightInfo>
                  </FlightDetails>
                  <FlightDetails>
                    <FlightInfo>
                      <FlightInfoDate>
                        <div>
                          {convertFlightDate(
                            flightOffer.inboundFlight.departureDateTime,
                            "month"
                          )}
                        </div>
                        <div>
                          {convertFlightDate(
                            flightOffer.inboundFlight.departureDateTime,
                            "day"
                          )}
                        </div>
                        <div>
                          {convertFlightDate(
                            flightOffer.inboundFlight.departureDateTime,
                            "year"
                          )}
                        </div>
                      </FlightInfoDate>
                      <FlightInfoBlock>
                        <FlightInfoBlockHeader>
                          <span className="flight-city">
                            {
                              flightOffer.inboundFlight.departureAirport
                                .locationCode
                            }
                          </span>{" "}
                          <span className="flight-time">
                            {convertFlightTime(
                              flightOffer.inboundFlight.departureDateTime
                            )}
                          </span>
                        </FlightInfoBlockHeader>
                        <FlightInfoBlockSubHeader>
                          {airportDetails(
                            airports,
                            flightOffer.inboundFlight.departureAirport
                              .locationCode,
                            "name"
                          )}
                          ,{" "}
                          {
                            airportDetails(
                              airports,
                              flightOffer.inboundFlight.departureAirport
                                .locationCode,
                              "country"
                            )["name"]
                          }
                        </FlightInfoBlockSubHeader>
                      </FlightInfoBlock>
                      <FlightDuration>
                        <span className="duration">
                          {calcTravelTimeString(
                            flightOffer.inboundFlight.departureDateTime,
                            flightOffer.inboundFlight.arrivalDateTime
                          )}
                        </span>
                        <LineUl />
                        <span className="title">Direct</span>
                      </FlightDuration>
                      <FlightInfoBlock>
                        <FlightInfoBlockHeader>
                          <span className="flight-city">
                            {
                              flightOffer.inboundFlight.arrivalAirport
                                .locatiodivCode
                            }
                          </span>{" "}
                          <span className="flight-time">
                            {convertFlightTime(
                              flightOffer.inboundFlight.arrivalDateTime
                            )}
                          </span>
                        </FlightInfoBlockHeader>
                        <FlightInfoBlockSubHeader>
                          {airportDetails(
                            airports,
                            flightOffer.inboundFlight.arrivalAirport
                              .locationCode,
                            "name"
                          )}
                          ,{" "}
                          {
                            airportDetails(
                              airports,
                              flightOffer.inboundFlight.arrivalAirport
                                .locationCode,
                              "country"
                            )["name"]
                          }
                        </FlightInfoBlockSubHeader>
                      </FlightInfoBlock>
                    </FlightInfo>
                  </FlightDetails>
                </TicketDetails>

                <TicketPrice>
                  <PriceTitle>
                    &euro;{flightOffer.pricingInfoSum.totalPriceOnePassenger}
                  </PriceTitle>
                  <TicketButton as="a" href={flightOffer.deeplink.href}>
                    Buy Tickets
                  </TicketButton>
                </TicketPrice>
              </TicketContainer>
            </FlightOffersLi>
          );
        })}
      </FlightOffersUl>
    </FlightOffersContainer>
  );
}

export default FlightOffers;

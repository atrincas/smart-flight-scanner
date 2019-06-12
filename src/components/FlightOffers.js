import React from "react";
import { useSelector } from "react-redux";

import {
  calcTravelTimeString,
  convertFlightDate,
  convertFlightTime,
  airportDetails
} from "../utils";

import styled from "styled-components";

const uuidv4 = require("uuid/v4");

const FlightOffersContainer = styled.div``;
const FlightOffersUl = styled.ul`
  list-style: none;
`;
const FlightOffersLi = styled.li`
  margin: 10px;
`;
const TicketContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: auto;
  padding: 10px;
  width: 55%;
`;
const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
const FlightDetails = styled.div`
  display: flex;
  margin: 10px;
`;
const FlightInfo = styled.div`
  display: flex;
  width: 100%;
`;
const FlightInfoDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10%;
  border: 1px dotted #000;
  font-size: 12px;
  font-style: italic;
`;
const FlightInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
const FlightInfoBlockHeader = styled.div``;
const FlightInfoBlockSubHeader = styled.div`
  font-size: 10px;
  text-align: center;
`;
const FlightDuration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  font-size: 12px;
`;
const LineUl = styled.div`
  height: 2px;
  width: 50%;
  background-color: #817b8f;
  margin: 0.375rem auto;
  padding: 0;
  position: relative;
  border-radius: 0.375rem;
  display: block;
  text-align: center;
  line-height: 0;

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    right: -0.375rem;
    top: 50%;
    margin-top: -8px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='%23898294' d='M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71'/%3E%3C/svg%3E");
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 100% 50%;
    background-size: 12px;
  }
`;

const TicketPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
`;

const TicketButton = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0.375rem 1.125rem;
  border: 0;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#00d775),
    to(#00bd68)
  );
  background-image: -webkit-linear-gradient(top, #00d775, #00bd68);
  background-image: -o-linear-gradient(top, #00d775 0, #00bd68 100%);
  background-image: linear-gradient(-180deg, #00d775, #00bd68);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background-color: #00d775;
  border-radius: 1.125rem;
`;

const PriceTitle = styled.div``;

function FlightOffers({ offers, noSearchResults }) {
  const airports = useSelector(state => state.airports.airports);
  return offers.length === 0 && !noSearchResults ? (
    <div>...Loading</div>
  ) : noSearchResults ? (
    <div>No Search Results!</div>
  ) : (
    <FlightOffersContainer>
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
                  <TicketButton>Buy Tickets</TicketButton>
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

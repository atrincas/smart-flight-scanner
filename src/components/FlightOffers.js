import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import {
  calcTravelTimeString,
  convertFlightDate,
  convertFlightTime,
  airportDetails
} from "../utils";

import {
  Loader,
  FadeIn,
  FlightOffersContainer,
  OrderByBar,
  OrderByButton,
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
  PriceTitle,
  NoSearchResults,
  NoSearchResultsContainer,
  TryAgainButton
} from "../styled/Lib";

const uuidv4 = require("uuid/v4");

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

function FlightOffers({ isLoading, noSearchResults }) {
  const airports = useSelector(state => state.airports.airports);
  const offers = useSelector(
    state => state.finalFlightOffers.finalFlightOffers
  );
  const [finalOffers, setFinalOffers] = useState([]);
  const topContainer = useRef(null);

  // Scroll to top of FlightOffersContainer:
  useEffect(() => {
    scrollToRef(topContainer);
  }, [isLoading]);

  useEffect(() => {
    setFinalOffers(offers);
  }, [offers]);

  const handleOrderByDateDes = () => {
    // Make sure the array is passed by value:
    let arr = finalOffers.slice();
    let newOrder = arr.sort(function(a, b) {
      let dateA = new Date(a.outboundFlight.departureDateTime);
      let dateB = new Date(b.outboundFlight.departureDateTime);
      return dateB - dateA;
    });
    setFinalOffers(newOrder);
  };
  const handleOrderByDateAsc = () => {
    // Make sure the array is passed by value:
    let arr = finalOffers.slice();
    let newOrder = arr.sort(function(a, b) {
      let dateA = new Date(a.outboundFlight.departureDateTime);
      let dateB = new Date(b.outboundFlight.departureDateTime);
      return dateA - dateB;
    });
    setFinalOffers(newOrder);
  };

  const handleOrderByPriceLH = () => {
    // Make sure the array is passed by value:
    let arr = finalOffers.slice();
    let newOrder = arr.sort(
      (a, b) =>
        a.pricingInfoSum.totalPriceOnePassenger -
        b.pricingInfoSum.totalPriceOnePassenger
    );
    setFinalOffers(newOrder);
  };
  const handleOrderByPriceHL = () => {
    // Make sure the array is passed by value:
    let arr = finalOffers.slice();
    let newOrder = arr.sort(
      (a, b) =>
        b.pricingInfoSum.totalPriceOnePassenger -
        a.pricingInfoSum.totalPriceOnePassenger
    );
    setFinalOffers(newOrder);
  };
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  return (
    <FlightOffersContainer ref={topContainer}>
      {isLoading ? (
        <FadeIn>
          <Loader />
        </FadeIn>
      ) : noSearchResults ? (
        <NoSearchResultsContainer>
          <NoSearchResults>
            <span>No Search Results!</span>
            <TryAgainButton onClick={scrollToTop}>Try Again</TryAgainButton>
          </NoSearchResults>
        </NoSearchResultsContainer>
      ) : !finalOffers.length ? (
        <FadeIn>
          <Loader />
        </FadeIn>
      ) : (
        <>
          <OrderByBar>
            <div>
              <b>Order By</b>
            </div>
            <OrderByButton onClick={handleOrderByDateAsc}>
              Departure Date Ascending
            </OrderByButton>
            <OrderByButton onClick={handleOrderByDateDes}>
              Departure Date Descending
            </OrderByButton>
            <OrderByButton onClick={handleOrderByPriceLH}>
              Price low-high
            </OrderByButton>
            <OrderByButton onClick={handleOrderByPriceHL}>
              Price high-low
            </OrderByButton>
          </OrderByBar>
          <FlightOffersUl>
            {finalOffers.map(flightOffer => {
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
                        &euro;
                        {flightOffer.pricingInfoSum.totalPriceOnePassenger}
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
        </>
      )}
    </FlightOffersContainer>
  );
}

export default FlightOffers;

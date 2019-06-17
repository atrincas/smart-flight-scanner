// Function that calculate the travel time of a flight:
export const calcTravelTime = function(departure, arrival) {
  let dateDep = new Date(departure),
    dateArr = new Date(arrival);
  let travelTime = (dateArr - dateDep) / (1000 * 3600);

  return travelTime;
};

export const calcTravelTimeString = function(departure, arrival) {
  let dateDep = new Date(departure),
    dateArr = new Date(arrival);
  let travelTime = (dateArr - dateDep) / (1000 * 3600);
  let hours = Math.floor(travelTime);
  let minutes = Math.round((travelTime - hours) * 60);
  let travelTimeString = minutes ? `${hours}h ${minutes}m` : `${hours}h`;

  return travelTimeString;
};

export const convertFlightTime = function(time) {
  let timeString = new Date(time).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return timeString;
};

export const convertFlightDate = function(date, type) {
  let d;

  if (type === "month") {
    const monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec."
    ];

    d = monthNames[new Date(date).getMonth()];

    return d;
  }

  if (type === "day") {
    d = new Date(date).getDate();
    return d;
  }

  if (type === "year") {
    d = new Date(date).getFullYear();
    return d;
  }

  return d;
};

export const airportDetails = function(airports, flightId, type) {
  let details = airports.filter(airport => airport.id === flightId);
  return details[0][type];
};

// Function that filter the flight offers based on travel time:
export const filterFlightOffers = function(flights, min, max) {
  let newList = [],
    oldList = flights;

  oldList.forEach(flightOffer => {
    let outboundDep = flightOffer["outboundFlight"]["departureDateTime"],
      outboundArr = flightOffer["outboundFlight"]["arrivalDateTime"],
      inboundDep = flightOffer["inboundFlight"]["departureDateTime"],
      inboundArr = flightOffer["inboundFlight"]["arrivalDateTime"];

    let outboundTime = calcTravelTime(outboundDep, outboundArr),
      inboundTime = calcTravelTime(inboundDep, inboundArr);

    if (
      outboundTime >= min &&
      inboundTime >= min &&
      outboundTime <= max &&
      inboundTime <= max
    ) {
      newList.push(flightOffer);
    }
  });
  return newList;
};

const convertDate = function(date) {
  if (typeof date === "undefined") {
    return;
  }
  return date
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("");
};

export const addDays = function(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + parseInt(days));
  return result;
};

export const subDays = function(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() - parseInt(days));
  return result;
};

export const calcStartPeriodRange = function(
  startDate,
  endDate,
  overnighStays
) {
  let start = startDate,
    end = subDays(endDate, overnighStays);
  return convertDate(start) + "-" + convertDate(end);
};

export const calcEndPeriodRange = function(startDate, endDate, overnighStays) {
  let start = addDays(startDate, overnighStays),
    end = endDate;
  return convertDate(start) + "-" + convertDate(end);
};

export const convertQueries = function(queries) {
  // Prevent function from running if queries is undefined:
  if (typeof queries === "undefined") {
    return;
  }
  let newQueries = {};
  newQueries["Origin"] = queries["from"];
  newQueries["OriginDepartureDate"] = calcStartPeriodRange(
    queries["startPeriod"],
    queries["endPeriod"],
    queries["overnightStay"]
  );
  newQueries["OriginArrivalDate"] = calcEndPeriodRange(
    queries["startPeriod"],
    queries["endPeriod"],
    queries["overnightStay"]
  );
  newQueries["DaysAtDestination"] = queries["overnightStay"];
  return newQueries;
};

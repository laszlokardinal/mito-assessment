import renderTime from "./renderTime.js";
import renderDay from "./renderDay.js";

const renderFlightTimeInterval = (departureTime, arrivalTime) => {
  const departureDate = new Date(departureTime);

  const departureTimeString = renderTime(departureTime);

  const departureDay = renderDay(departureDate.getDay(), {
    useAbbreviations: true
  });

  const returnDate = new Date(arrivalTime);

  const arrivalTimeString = renderTime(arrivalTime);

  const arrivalDay = renderDay(returnDate.getDay(), {
    useAbbreviations: true
  });

  return [
    departureDay,
    departureTimeString,
    "–",
    arrivalDay !== departureDay ? arrivalDay : null,
    arrivalTimeString
  ]
    .filter(truthy => truthy)
    .join(" ");
};

export default renderFlightTimeInterval;

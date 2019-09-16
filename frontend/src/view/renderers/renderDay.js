const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const renderDay = (day, { useAbbreviations = false } = {}) =>
  useAbbreviations ? dayAbbreviations[day] : days[day];

export default renderDay;

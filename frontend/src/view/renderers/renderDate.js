import renderDay from "./renderDay.js";
import renderMonth from "./renderMonth.js";

const renderDate = (
  value,
  { displayDay = false, displayDayAbbreviations = false, omitYear = false } = {}
) => {
  const date = new Date(value);

  const builder = [];

  if (displayDay) {
    builder.push(renderDay(date.getDay()) + ",");
  } else {
    if (displayDayAbbreviations) {
      builder.push(renderDay(date.getDay(), { useAbbreviations: true }));
    }
  }

  const day = date.getDate();
  builder.push(day);

  const month = renderMonth(date.getMonth());
  builder.push(month);

  if (!omitYear) {
    const year = date.getFullYear();
    builder.push(year);
  }

  return builder.join(" ");
};

export default renderDate;

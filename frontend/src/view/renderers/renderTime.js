const renderTime = time => {
  const date = new Date(time);

  const hoursString = date
    .getHours()
    .toString()
    .padStart(2, 0);

  const minutesString = date
    .getMinutes()
    .toString()
    .padStart(2, 0);

  return `${hoursString}:${minutesString}`;
};

export default renderTime;

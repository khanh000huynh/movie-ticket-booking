export const convert = (datetime) => {
  let clone = new Date(datetime);
  let hours = clone.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = clone.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
};

export const calculateShowtime = (start, time) => {
  let startTime = new Date(start.toString()).getTime();
  let endTime = startTime + time * 60 * 1000;
  startTime = convert(startTime);
  endTime = convert(endTime);

  return { startTime, endTime };
};

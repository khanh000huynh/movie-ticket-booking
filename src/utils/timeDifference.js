import { toDMY } from "./showDate";
import { convert } from "./showtime";

export const calculateTimeDifference = (dateStrA, dateStrB) => {
  const diff = Math.floor(Math.abs(dateStrA - dateStrB));
  const secondsDiff = Math.floor(diff / 1000);
  const minutesDiff = Math.floor(diff / 1000 / 60);
  const hoursDiff = Math.floor(diff / 1000 / 60 / 60);
  if (hoursDiff >= 24) return toDMY(dateStrA) + " lúc " + convert(dateStrA);
  if (minutesDiff >= 60) return `${hoursDiff} giờ trước`;
  if (secondsDiff >= 60) return `${minutesDiff} phút trước`;
  return "Vừa xong";
};

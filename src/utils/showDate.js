export const getDayOfWeek = (date) => {
  const d = date.getDay();
  switch (d) {
    case 0:
      return "Chủ Nhật";
    default:
      return "Thứ " + (d + 1);
  }
};

export const toDMY = (date) => {
  const d = new Date(date);
  let day = d.getDate();
  if (day < 10) day = "0" + day;
  let month = d.getMonth() + 1;
  if (month < 10) month = "0" + month;
  const year = d.getFullYear();
  return day + "/" + month + "/" + year;
};

export const toYMD = (dmyString) => {
  return (
    dmyString.substr(-4) +
    "/" +
    dmyString.substr(3, 2) +
    "/" +
    dmyString.substr(0, 2)
  );
};

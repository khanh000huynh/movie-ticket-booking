import { toDMY, toYMD } from "./showDate";

const sortDateList = (dateList) => {
  return dateList
    .map((date) => toYMD(date))
    .sort((a, b) => {
      return new Date(a) - new Date(b);
    });
};

export const groupShowDate = (cumRapChieu) => {
  const dateList = [];
  for (let cumRap of cumRapChieu) {
    const lichChieuPhim = cumRap.lichChieuPhim;
    for (let lichChieu of lichChieuPhim) {
      if (!dateList.includes(toDMY(lichChieu.ngayChieuGioChieu)))
        dateList.push(toDMY(lichChieu.ngayChieuGioChieu));
    }
  }
  return sortDateList(dateList);
};

export const sortShowtime = (arr) => {
  let noSwap = true;
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (
        new Date(arr[j].ngayChieuGioChieu).getHours() >
        new Date(arr[j + 1].ngayChieuGioChieu).getHours()
      ) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwap = false;
      }
    }
    if (noSwap) break;
  }
  return arr;
};

export const getTheaterName = (tenCumRap) => {
  const prefix = tenCumRap.slice(0, tenCumRap.indexOf("-") - 1);
  const suffix = tenCumRap.slice(tenCumRap.indexOf("-") + 1);
  return {
    prefix,
    suffix,
  };
};

export const getTheaterByMovieId = (maPhim) => {};

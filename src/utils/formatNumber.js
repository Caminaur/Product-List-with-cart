export const formatNumber = (number) => {
  return new Intl.NumberFormat("EN-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

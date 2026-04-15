export const formatCurrencyINR = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumberIN = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(Number(value || 0));

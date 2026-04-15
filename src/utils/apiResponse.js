export const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

export const extractErrorMessage = (error, fallback = "Something went wrong") => {
  if (!error) return fallback;
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

// src/utils/date.utils.js
export const updateFormattedDate = (locale) => {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return currentDate.toLocaleString(locale, options);
};
import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// Calculates the difference in days between two dates, accepting both Date objects and date strings.
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Formats a date string to show the distance from the current date, adding a suffix for clarity.
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Retrieves the current date as an ISO string, with an option to set it to the end of the day.
export const getToday = function (options = {}) {
  const today = new Date();

  // Sets the date to the last moment of the day if 'end' option is true.
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString(); // Returns the ISO string representation of the date.
};

// Formats a numeric value as a currency string in USD.
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

// Formats an ISO date string into a more human-readable format based on locale and options.
export const formatDate = (
  isoDateString,
  locale = "en-US",
  options = { year: "numeric", month: "long", day: "numeric" },
) => {
  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat(locale, options).format(date); // Returns the formatted date string.
};

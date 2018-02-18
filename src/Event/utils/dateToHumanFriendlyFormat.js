/**
 * Convert date from ISO 8601 format to human readable string
 * @param  {string} date - expects ISO 8601 format
 * @param  {string} locale - language to convert
 * @return {string} human readable date
 */
export function dateToHumanFriendlyFormat(date, locale = 'ru') {
  const dateInMs = Date.parse(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateObj = new Date(dateInMs);
  return dateObj.toLocaleString(locale, options);
}

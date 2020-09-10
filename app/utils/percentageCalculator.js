/**
 * @param  {number} value A value from which to calculate a percent value
 * @param  {number} percentage Percentage value
 * @returns {number} Returns a given percentage value of a number
 */
export const calculatePercentageValue = (value, percentage) =>
  (value * percentage) / 100;

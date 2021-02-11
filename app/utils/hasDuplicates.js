import groupBy from 'lodash/groupBy';

/**
 * @param  {Array<any>} array input array
 * @param {any} value checked value
 * @returns {boolean} `true` if array has duplicates, `false` otherwise
 */
export const hasDuplicates = (array, value) => {
  if (!value) return false;

  const grouped = groupBy(array)[value];

  if (!grouped) return false;

  return grouped.length !== 1;
};

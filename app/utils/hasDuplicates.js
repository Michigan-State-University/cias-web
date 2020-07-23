import groupBy from 'lodash/groupBy';

/**
 * @param  {Array<any>} array input array
 * @param {string} value checked value
 * @returns {boolean} `true` if array has duplicates, `false` otherwise
 */
export const hasDuplicates = (array, value) =>
  value ? groupBy(array)[value].length !== 1 : false;

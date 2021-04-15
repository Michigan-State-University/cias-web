import intersection from 'lodash/intersection';

/**
 * Check if two arrays overlap
 * @param  {Array<any>} array
 * @param  {Array<any>} otherArray
 * @returns {boolean} `true` if arrays overlap, `false` otherwise
 */
export const includesArray = (array, otherArray) => {
  const mutualValues = intersection(array, otherArray);

  return mutualValues.length > 0;
};

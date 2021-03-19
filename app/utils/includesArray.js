import intersection from 'lodash/intersection';

export const includesArray = (array, otherArray) => {
  const mutualValues = intersection(array, otherArray);

  return mutualValues.length > 0;
};

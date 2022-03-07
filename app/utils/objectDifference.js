import diff from 'object-diff';
import isEqual from 'lodash/isEqual';

/**
 * Find the differences between two objects and push to a new object
 * @param  {Object} obj1 The original object
 * @param  {Object} obj2 The object to compare against it
 * @return {Object}      An object of differences between the two
 */
export const objectDifference = (obj1, obj2) =>
  diff.custom({ equal: isEqual }, obj1, obj2);

import keys from 'lodash/keys';
import has from 'lodash/has';

/**
 *  Return an object containing the keys that have different values in
 *  two structurally similar objects.
 *  @method  deepDiff
 *  @param   {object}   obj1                 First object
 *  @param   {object}   obj2                 Second object, keys that have different values from
 *                                            their counterpart in obj1 will be returned
 *  @param   {boolean}  [keepNewKeys=true]  If set to true, keys that doesn't exist in obj1 but
 *                                            exist in obj2 will be returned.
 *  @return  {object}                        A diff object
 */
const deepDiff = (obj1, obj2, keepNewKeys = true) => {
  if (typeof obj1 !== 'object')
    throw new TypeError('First parameter must be an object');

  if (typeof obj2 !== 'object')
    throw new TypeError('Second parameter must be an object');

  const diff = {};

  keys(obj2).forEach(key => {
    if (!has(obj1, key)) {
      if (keepNewKeys) diff[key] = obj2[key];

      return;
    }

    if (obj1[key] === null || obj2[key] === null) {
      if (obj1[key] !== obj2[key]) diff[key] = obj2[key];

      return;
    }

    if (typeof obj2[key] === 'object') {
      if (obj2[key] instanceof Array) {
        if (!arrayEquals(obj2[key], obj1[key])) diff[key] = obj2[key];

        return;
      }

      if (!(obj1[key] instanceof Object)) {
        diff[key] = obj2[key];

        return;
      }

      diff[key] = deepDiff(obj1[key], obj2[key], keepNewKeys);

      //  Don't keep trace of a null key if it was generated by a recursive use of deepDiff.
      if (diff[key] === null) delete diff[key];

      return;
    }

    if (obj1[key] !== obj2[key]) diff[key] = obj2[key];
  });

  // If there's no difference between the two objects, return null
  if (keys(diff).length === 0) return null;

  return diff;
};

/**
 *  Checks if two arrays are strictly equals
 *  @method  arrayEquals
 *  @param   {[]}     arr1  First array
 *  @param   {[]}     arr2  Second array, will be compared to arr1
 *  @return  {boolean}         True if array are equals, otherwise false
 */
const arrayEquals = (arr1, arr2) => {
  if (!(arr1 instanceof Array))
    throw new TypeError('arrayEqual 1st parameter must be an array');

  if (!(arr2 instanceof Array)) return false;

  if (arr1.length !== arr2.length) return false;

  for (let i = 0, l = arr1.length; i < l; i += 1)
    if (arr1[i] instanceof Array && arr2[i] instanceof Array)
      if (!arrayEquals(arr1[i], arr2[i])) return false;
      else if (arr1[i] instanceof Object && arr2[i] instanceof Object)
        if (deepDiff(arr1[i], arr2[i], true) !== null) return false;
        else if (arr1[i] !== arr2[i]) return false;

  return true;
};

export default deepDiff;

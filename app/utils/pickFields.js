import pick from 'lodash/pick';
import isNullOrUndefined from 'utils/isNullOrUndefined';

/**
 * @param {object} object
 * @param {string[]} fields
 * @returns {object} Returns object with specified `fields`. If `fields` is null or empty,
 *                   return whole `object`.
 */
const pickFields = (object, fields) =>
  !isNullOrUndefined(fields) && fields.length !== 0
    ? pick(object, fields)
    : object;

export default pickFields;

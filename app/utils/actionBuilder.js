import isNullOrUndefined from 'utils/isNullOrUndefined';
/**
 * @param  {string} type
 * @param  {Object} payload
 * @param  {string[]} fields=null
 */
const actionBuilder = (type, payload, fields = null) => ({
  type,
  payload,
  ...(!isNullOrUndefined(fields) && { fields }),
});

export { actionBuilder };

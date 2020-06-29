/**
 * @param  {object} obj object
 * @param  {string} property string
 */
export const hasObjectProperty = (obj, property) =>
  Object.prototype.hasOwnProperty.call(obj, property);

import normalize from 'json-api-normalizer';
import build from 'redux-object';

const defaultConfig = {
  id: null,
  options: { eager: true, ignoreLinks: false, includeType: false },
  isSingleObject: false,
};

/**
 * @deprecated DEPRECATED: I made easier functions separately for Object and Array.
 *  Look `jsonApiToObject` and `jsonApiToArray` functions.
 *  This is left for compatibility reasons.
 * @description Map JSON API object to standard object
 * @param {object} json
 * @param {string} type
 * @param {typeof defaultConfig} [config=defaultConfig]
 */
export const mapJsonApiToObject = (json, type, config) => {
  const mergedConfig = { ...defaultConfig, ...config };

  const normalizedData = build(
    normalize(json),
    type,
    mergedConfig.id,
    mergedConfig.options,
  );

  return mergedConfig.isSingleObject ? normalizedData[0] : normalizedData;
};

const jsonApiMapper = (json, type) =>
  build(normalize(json), type, defaultConfig.id, defaultConfig.options);

/**
 * Map JSON API object to JS object
 * @param {object} json
 * @param {string} type
 */
export const jsonApiToObject = (json, type) => jsonApiMapper(json, type)[0];

/**
 * Map JSON API object to JS array
 * @param {object} json
 * @param {string} type
 */
export const jsonApiToArray = (json, type) => jsonApiMapper(json, type) || [];

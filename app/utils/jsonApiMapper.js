import normalize from 'json-api-normalizer';
import build from 'redux-object';

const defaultConfig = {
  id: null,
  options: { eager: true, ignoreLinks: false, includeType: false },
  isSingleObject: false,
};

/**
 * Map JSON API object to standard object
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

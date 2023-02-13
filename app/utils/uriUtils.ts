export const URIEncodeObject = (
  object: Record<string, string | number | boolean>,
): Record<string, string> =>
  Object.entries(object).reduce(
    (prev, [key, value]) => ({ ...prev, [key]: encodeURIComponent(value) }),
    {},
  );

export const parseQueryToSingleValue = (query: string | string[] | null) => {
  if (Array.isArray(query)) {
    return query[0];
  }

  return query;
};

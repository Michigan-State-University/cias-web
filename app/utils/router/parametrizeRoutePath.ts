import { RoutePath } from 'global/constants';

export const parametrizeRoutePath = (
  path: RoutePath,
  pathParams: Record<string, string>,
  queryParams?: Record<string, string>,
) => {
  let parametrizedPath: string = path;
  Object.entries(pathParams).forEach(([param, value]) => {
    parametrizedPath = parametrizedPath.replace(`:${param}`, value);
  });

  if (queryParams) {
    const urlSearchParams = new URLSearchParams(queryParams);
    return `${parametrizedPath}?${urlSearchParams}`;
  }

  return parametrizedPath;
};

import { RoutePath } from 'global/constants';

export const parametrizeRoutePath = (
  path: RoutePath,
  params: Record<string, string>,
) => {
  let parametrizedPath: string = path;
  Object.entries(params).forEach(([param, value]) => {
    parametrizedPath = parametrizedPath.replace(`:${param}`, value);
  });
  return parametrizedPath;
};

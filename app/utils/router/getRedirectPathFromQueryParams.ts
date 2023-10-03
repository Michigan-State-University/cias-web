import { Search } from 'history';

import { RoutePath, REDIRECT_QUERY_KEY } from 'global/constants';

export const getRedirectPathFromQueryParams = (locationSearch: Search) => {
  const queryParams = new URLSearchParams(locationSearch);
  const redirectTo = queryParams.get(REDIRECT_QUERY_KEY);
  queryParams.delete(REDIRECT_QUERY_KEY);

  let redirectPath = decodeURIComponent(redirectTo ?? RoutePath.DASHBOARD);

  const hasOtherQueryParams = !!Array.from(queryParams.entries()).length;
  if (hasOtherQueryParams) {
    const hasRedirectPathParams = redirectPath.includes('?');
    redirectPath += `${
      hasRedirectPathParams ? '&' : '?'
    }${queryParams.toString()}`;
  }

  return redirectPath;
};

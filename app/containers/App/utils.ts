import { matchPath } from 'react-router';

import { PasswordAuthenticatedRoles, Roles } from 'models/User/RolesManager';

import { arraysOverlap } from 'utils/arrayUtils';

import { ALL_ROUTE_PATHS, RoutePath } from 'global/constants';

import { OMIT_FETCH_SELF_DETAILS_PATHS } from './constants';

export const shouldFetchSelfDetailsOnPath = (pathname: string) => {
  const match = matchPath(pathname, { path: ALL_ROUTE_PATHS, exact: true });
  return (
    match && !OMIT_FETCH_SELF_DETAILS_PATHS.includes(match.path as RoutePath)
  );
};

export const shouldFetchSelfDetailsByUserRoles = (userRoles: Roles[]) =>
  arraysOverlap(userRoles, PasswordAuthenticatedRoles);

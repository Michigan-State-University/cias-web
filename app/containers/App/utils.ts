import { OMIT_FETCH_SELF_DETAILS_PATHS } from './constants';

export const shouldFetchSelfDetailsOnPath = (pathname: string) =>
  !OMIT_FETCH_SELF_DETAILS_PATHS.some((path) => pathname.includes(path));

import { matchPath, useLocation } from 'react-router';

import { RoutePath } from 'global/constants';
import { match } from 'react-router-dom';

export const RESEARCHERS_INTERVENTION_PATHS: RoutePath[] = [
  RoutePath.INTERVENTION_DETAILS,
  RoutePath.EDIT_SESSION,
  RoutePath.SESSION_SETTINGS,
  RoutePath.REPORT_TEMPLATES,
  RoutePath.TEXT_MESSAGES,
  RoutePath.GENERATED_REPORTS,
  RoutePath.SESSION_MAP,
];

export type Params = { interventionId: string; sessionId?: string };

export const matchResearchersInterventionPaths = (
  pathname: string | undefined = window.location.pathname,
): match<Params> | null =>
  matchPath<Params>(pathname, {
    path: RESEARCHERS_INTERVENTION_PATHS,
    exact: true,
  });

export const useMatchResearchersInterventionPaths =
  (): match<Params> | null => {
    const { pathname } = useLocation();
    return matchResearchersInterventionPaths(pathname);
  };

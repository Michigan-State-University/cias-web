import { matchPath, useLocation } from 'react-router';

const INTERVENTION_PATH = '/interventions/:interventionId';
const SESSION_PATH = `${INTERVENTION_PATH}/sessions/:sessionId`;

export const RESEARCHERS_INTERVENTION_PATHS = [
  INTERVENTION_PATH,
  `${SESSION_PATH}/edit`,
  `${SESSION_PATH}/settings`,
  `${SESSION_PATH}/report-templates`,
  `${SESSION_PATH}/sms-messaging`,
  `${SESSION_PATH}/generated-reports`,
  `${SESSION_PATH}/map`,
];

export const matchResearchersInterventionPaths = (
  pathname: string | undefined = window.location.pathname,
) =>
  matchPath<{ interventionId?: string }>(pathname, {
    path: RESEARCHERS_INTERVENTION_PATHS,
    exact: true,
  });

export const useMatchResearchersInterventionPaths = () => {
  const { pathname } = useLocation();
  return matchResearchersInterventionPaths(pathname);
};

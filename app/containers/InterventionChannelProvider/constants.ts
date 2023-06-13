const INTERVENTION_ROUTE = '/interventions/:interventionId';
const SESSION_ROUTE = `${INTERVENTION_ROUTE}/sessions/:sessionId`;

export const INTERVENTION_CHANNEL_ROUTES = [
  INTERVENTION_ROUTE,
  `${SESSION_ROUTE}/edit`,
  `${SESSION_ROUTE}/settings`,
  `${SESSION_ROUTE}/report-templates`,
  `${SESSION_ROUTE}/sms-messaging`,
  `${SESSION_ROUTE}/generated-reports`,
  `${SESSION_ROUTE}/map`,
];

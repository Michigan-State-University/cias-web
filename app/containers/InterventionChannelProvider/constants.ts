const BASE_INTERVENTION_ROUTE = '/interventions/:interventionId';
const SPECIFIC_INTERVENTION_ROUTE = `${BASE_INTERVENTION_ROUTE}/sessions/:sessionId/`;

export const INTERVENTION_CHANNEL_ROUTES = [
  BASE_INTERVENTION_ROUTE,
  `${SPECIFIC_INTERVENTION_ROUTE}/edit`,
  `${SPECIFIC_INTERVENTION_ROUTE}/settings`,
  `${SPECIFIC_INTERVENTION_ROUTE}/report-templates`,
  `${SPECIFIC_INTERVENTION_ROUTE}/sms-messaging`,
  `${SPECIFIC_INTERVENTION_ROUTE}/generated-reports`,
  `${SPECIFIC_INTERVENTION_ROUTE}/map`,
];
export const REDIRECT_QUERY_KEY = 'redirect_to';

export enum RoutePath {
  DASHBOARD = '/',
  INBOX = '/live-chat',
  ARCHIVE = '/live-chat/archive',
  MANAGE_ORGANIZATIONS = '/organization/:organizationId',
  DASHBOARD_SETUP = '/organization/:organizationId/dashboard-setup',
  DASHBOARD_VIEW = '/organization/:organizationId/dashboard',
  PARTICIPANT_REPORTS = '/reports',
  LOGIN = '/login',
  REGISTER = '/register',
  RESET_PASSWORD = '/reset-password',
  SET_NEW_PASSWORD = '/set-new-password',
  LOGOUT = '/logout',
  EDIT_SESSION = '/interventions/:interventionId/sessions/:sessionId/edit',
  ANSWER_SESSION = '/interventions/:interventionId/sessions/:sessionId/fill',
  SESSION_SETTINGS = '/interventions/:interventionId/sessions/:sessionId/settings',
  REPORT_TEMPLATES = '/interventions/:interventionId/sessions/:sessionId/report-templates',
  GENERATED_REPORTS = '/interventions/:interventionId/sessions/:sessionId/generated-reports',
  TEXT_MESSAGES = '/interventions/:interventionId/sessions/:sessionId/sms-messaging',
  SESSION_MAP = '/interventions/:interventionId/sessions/:sessionId/map',
  USER_INTERVENTION = '/user_interventions/:userInterventionId',
  INTERVENTION_INVITE = '/interventions/:interventionId/invite',
  USERS_LIST = '/users',
  TEAMS_LIST = '/teams',
  TEAM_DETAILS = '/teams/:teamId',
  PREVIEW_SESSION_FROM_CURRENT = '/interventions/:interventionId/sessions/:sessionId/preview',
  PREVIEW_SESSION_FROM_INDEX = '/interventions/:interventionId/sessions/:sessionId/preview/:index',
  INTERVENTION_DETAILS = '/interventions/:interventionId',
  ACCOUNT_SETTINGS = '/profile',
  USER_DETAILS = '/users/:userId',
  ADMIN_CONSOLE = '/admin-console',
  ACCESSIBILITY_STATEMENT = '/accessibility-statement',
  FORBIDDEN = '/no-access',
  VERIFY_SHORT_LINK = '/int/:slug',
  VERIFY_USER_KEY = '/usr/:userKey',
  NOT_FOUND = '/not-found-page',
  INTERVENTION_NOT_AVAILABLE = '/not-available',
}

export const ALL_ROUTE_PATHS = Object.values(RoutePath);

export const WILDCARD_PATH = '*';

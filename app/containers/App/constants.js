import { RoutePath } from 'global/constants';

export const TOOLTIP_PORTAL_ID = 'tooltip-portal';

export const MODAL_PORTAL_ID = 'modal-portal';

export const ANSWER_SESSION_PAGE_ID = 'answer-session-page';

export const ANSWER_SESSION_CONTAINER_ID = 'answer-session-content';

export const OMIT_FETCH_SELF_DETAILS_PATHS = [
  RoutePath.PREVIEW_SESSION_FROM_CURRENT,
  RoutePath.PREVIEW_SESSION_FROM_INDEX,
  RoutePath.LOGOUT,
  RoutePath.VERIFY_USER_KEY,
  RoutePath.VERIFY_SMS_LINK,
];

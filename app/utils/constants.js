export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const DEFAULT_PAUSE_DURATION = 2;

/**
 * @readonly
 * @enum {string}
 */
export const HttpMethods = {
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  POST: 'POST',
  DELETE: 'DELETE',
};

/**
 * @readonly
 * @enum {number}
 */
export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
};

/**
 * @readonly
 * @enum {number}
 */
export const KeyCodes = {
  ESC: 27,
};

export const ForbiddenReason = {
  TERMS_NOT_ACCEPTED: 'TERMS_NOT_ACCEPTED',
  TWO_FACTOR_NEEDED: '2FA_NEEDED',
};

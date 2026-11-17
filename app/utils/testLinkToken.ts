export const TEST_LINK_TOKEN_PARAM = 'test_link_token';

const TEST_LINK_TOKEN_STORAGE_KEY = 'cias.testLinkToken';

const TEST_LINK_TOKEN_INTERVENTION_KEY = 'cias.testLinkTokenInterventionId';

let capturedToken: Nullable<string> = null;

let capturedInterventionId: Nullable<string> = null;

const readStoredToken = (): Nullable<string> => {
  try {
    return window.sessionStorage.getItem(TEST_LINK_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeToken = (token: string): void => {
  try {
    window.sessionStorage.setItem(TEST_LINK_TOKEN_STORAGE_KEY, token);
  } catch {
    // Intentionally swallowed — sessionStorage is unavailable in private mode
  }
};

const removeStoredToken = (): void => {
  try {
    window.sessionStorage.removeItem(TEST_LINK_TOKEN_STORAGE_KEY);
  } catch {
    // Intentionally swallowed — sessionStorage is unavailable in private mode
  }
};

const readStoredInterventionId = (): Nullable<string> => {
  try {
    return window.sessionStorage.getItem(TEST_LINK_TOKEN_INTERVENTION_KEY);
  } catch {
    return null;
  }
};

const storeInterventionId = (interventionId: string): void => {
  try {
    window.sessionStorage.setItem(
      TEST_LINK_TOKEN_INTERVENTION_KEY,
      interventionId,
    );
  } catch {
    // Intentionally swallowed — sessionStorage is unavailable in private mode
  }
};

const removeStoredInterventionId = (): void => {
  try {
    window.sessionStorage.removeItem(TEST_LINK_TOKEN_INTERVENTION_KEY);
  } catch {
    // Intentionally swallowed — sessionStorage is unavailable in private mode
  }
};

const INTERVENTION_ID_IN_PATH = /^\/interventions\/([^/?#]+)/;

const interventionIdFromPath = (): Nullable<string> =>
  window.location.pathname.match(INTERVENTION_ID_IN_PATH)?.[1] ?? null;

export const appendTestLinkToken = (url: string, token: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${TEST_LINK_TOKEN_PARAM}=${encodeURIComponent(
    token,
  )}`;
};

export const captureTestLinkTokenFromUrl = (): Nullable<string> => {
  if (typeof window === 'undefined') return capturedToken;

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get(TEST_LINK_TOKEN_PARAM);

  if (!token) return capturedToken;

  capturedToken = token;
  capturedInterventionId = interventionIdFromPath();
  if (capturedInterventionId) storeInterventionId(capturedInterventionId);
  storeToken(token);

  searchParams.delete(TEST_LINK_TOKEN_PARAM);
  const search = searchParams.toString();

  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${search ? `?${search}` : ''}${
      window.location.hash
    }`,
  );

  return token;
};

export const getTestLinkToken = (): Nullable<string> =>
  capturedToken ?? readStoredToken();

export const testLinkTokenAppliesTo = (
  interventionId: Nullable<string>,
): boolean => {
  if (!getTestLinkToken()) return false;

  const captured = capturedInterventionId ?? readStoredInterventionId();
  if (!captured || !interventionId) return true;

  return captured === interventionId;
};

export const hasTestLinkToken = (): boolean =>
  testLinkTokenAppliesTo(interventionIdFromPath());

export const withTestLinkToken = <T extends Record<string, unknown>>(
  body: T,
): T => {
  if (!hasTestLinkToken()) return body;

  const token = getTestLinkToken();
  if (!token) return body;

  return { ...body, [TEST_LINK_TOKEN_PARAM]: token };
};

export const clearTestLinkToken = (): void => {
  capturedToken = null;
  capturedInterventionId = null;
  removeStoredToken();
  removeStoredInterventionId();
};

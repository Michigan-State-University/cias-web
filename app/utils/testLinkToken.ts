/**
 * Test-link token (CIAS-4187) — opaque to the client; never parse it or branch UI on its contents.
 *
 * Held in memory *and* mirrored into `sessionStorage`, so a reload between landing and Start does
 * not silently downgrade the fill to a real participant. `sessionStorage` does not reliably die
 * with the tab — a duplicated tab, a `window.open`ed child and session/crash restore all carry it
 * over — so the only real bound on an unspent token is the server's signed TTL.
 *
 * There is deliberately **no client-side age bound**. One used to live here and it opened a silent
 * hole: it counted from capture while the server's TTL counts from mint, so a long-open tab stopped
 * sending the token altogether and a fill got neither the marker nor the warning that the marker
 * had failed. Always send it; the server adjudicates.
 */

export const TEST_LINK_TOKEN_PARAM = 'test_link_token';

const TEST_LINK_TOKEN_STORAGE_KEY = 'cias.testLinkToken';

const TEST_LINK_TOKEN_INTERVENTION_KEY = 'cias.testLinkTokenInterventionId';

let capturedToken: Nullable<string> = null;

// Stored, not re-derived: capture strips the parameter, so after a reload the URL has nothing left,
// and `verify` echoes `intervention_id` only for a *valid* token — precisely not the verdicts the
// gate blocks on.
let capturedInterventionId: Nullable<string> = null;

// Private-mode / disabled-storage browsers throw on any `sessionStorage` access, and a missing
// token must never break a fill — every access degrades to "no token".
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
    // The in-memory copy still carries this page view.
  }
};

const removeStoredToken = (): void => {
  try {
    window.sessionStorage.removeItem(TEST_LINK_TOKEN_STORAGE_KEY);
  } catch {
    // A throwing `removeItem` leaves the entry behind. Accepted: the write at capture time already
    // succeeded, so storage is working, and the in-memory copy is cleared either way.
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
    // The in-memory copy still carries this page view.
  }
};

const removeStoredInterventionId = (): void => {
  try {
    window.sessionStorage.removeItem(TEST_LINK_TOKEN_INTERVENTION_KEY);
  } catch {
    // Same reasoning as `removeStoredToken`.
  }
};

// Every URL a test link can land on is `/interventions/:interventionId/…` — `createInviteUrl` builds
// only `INTERVENTION_INVITE` and `ANSWER_SESSION`, and both gated routes carry the parameter.
const INTERVENTION_ID_IN_PATH = /^\/interventions\/([^/?#]+)/;

const interventionIdFromPath = (): Nullable<string> =>
  window.location.pathname.match(INTERVENTION_ID_IN_PATH)?.[1] ?? null;

export const appendTestLinkToken = (url: string, token: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${TEST_LINK_TOKEN_PARAM}=${encodeURIComponent(
    token,
  )}`;
};

/**
 * Must run from `utils/history` *before* `createBrowserHistory()`: `connected-react-router`
 * snapshots `history.location` into the store at `createStore` time and never corrects it from the
 * mount-time `LOCATION_CHANGE`, so a later strip leaves the token in `state.router.location` for the
 * whole session. Bare `replaceState` because the router does not exist yet. Idempotent.
 */
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

/**
 * Deliberately **not** cleared once a fill succeeds: "Start session again" creates a brand-new guest,
 * and dropping the token here left that second fill unmarked and therefore permanent. Bounded by the
 * server's signed expiry instead.
 */
export const getTestLinkToken = (): Nullable<string> =>
  capturedToken ?? readStoredToken();

/**
 * What the landing-time gate keys on. It must **not** key on "did this page load lift a token out of
 * the URL": capture strips the parameter, so a reload has no token in the URL but still has one in
 * `sessionStorage` — the gate would go transparent while the sagas kept sending the dead token.
 * Scoping by intervention also keeps a leftover token from blocking a fill of something else.
 */
export const testLinkTokenAppliesTo = (
  interventionId: Nullable<string>,
): boolean => {
  if (!getTestLinkToken()) return false;

  const captured = capturedInterventionId ?? readStoredInterventionId();
  // No token of ours lands outside `/interventions/:id/…`; if we somehow cannot tell, take the
  // conservative answer and let the server adjudicate.
  if (!captured || !interventionId) return true;

  return captured === interventionId;
};

/**
 * Read *before* the request, never after — a log out or Quick Exit can clear the token mid-flight,
 * and the warning turns on whether *this* request carried one.
 */
export const hasTestLinkToken = (): boolean =>
  testLinkTokenAppliesTo(interventionIdFromPath());

/**
 * **Top level**, never inside the nested `user_session` key — that is where the backend reads it.
 * Returns the body untouched when there is no token.
 */
export const withTestLinkToken = <T extends Record<string, unknown>>(
  body: T,
): T => {
  if (!hasTestLinkToken()) return body;

  const token = getTestLinkToken();
  if (!token) return body;

  return { ...body, [TEST_LINK_TOKEN_PARAM]: token };
};

/** Called on log out. Fills deliberately do **not** call this — see `getTestLinkToken`. */
export const clearTestLinkToken = (): void => {
  capturedToken = null;
  capturedInterventionId = null;
  removeStoredToken();
  removeStoredInterventionId();
};

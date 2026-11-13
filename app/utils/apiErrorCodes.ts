/**
 * Readers for the `{ message, details: { errors: [{ code }] } }` error envelope
 * the API uses for SMS invitations and SMS campaigns. Build UI logic on the
 * codes, never on `message`.
 */

export const getApiErrorCodes = (error: any): string[] => {
  const errors = error?.response?.data?.details?.errors;
  if (!Array.isArray(errors)) return [];
  return errors
    .map((entry: any) => entry?.code)
    .filter((code: any): code is string => typeof code === 'string');
};

export const getApiErrorStatus = (error: any): Nullable<number> =>
  error?.response?.status ?? null;

export const getApiErrorReason = (error: any): Nullable<string> =>
  error?.response?.data?.details?.reason ?? null;

/**
 * Only a 400 carries a bare `details.reason`, and only for a missing
 * publication. Requiring the status as well keeps a future reason on another
 * endpoint from being read as "not published".
 */
export const isNotPublishedApiError = (error: any): boolean =>
  getApiErrorStatus(error) === 400 && !!getApiErrorReason(error);

/**
 * Seconds to wait after a 429, from `details.retry_after` or the `Retry-After`
 * header. Header names are lower-cased by axios.
 */
export const getApiRetryAfter = (error: any): Nullable<number> => {
  const fromDetails = error?.response?.data?.details?.retry_after;
  if (typeof fromDetails === 'number') return fromDetails;

  const fromHeader = error?.response?.headers?.['retry-after'];
  const parsed = Number(fromHeader);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

/**
 * Codes for the UI, never empty. A 403, a 400 that only carries
 * `details.reason` and any network/5xx failure have no `details.errors`, and
 * without a synthetic code the form would fail silently.
 */
export const getApiErrorCodesForDisplay = (error: any): string[] => {
  const codes = getApiErrorCodes(error);
  if (codes.length) return codes;

  if (isNotPublishedApiError(error)) return ['NOT_PUBLISHED'];

  const status = getApiErrorStatus(error);
  return [status ? `HTTP_${status}` : 'NETWORK_ERROR'];
};

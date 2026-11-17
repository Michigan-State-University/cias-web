import { Page, Request, Response } from '@playwright/test';

export type ApiResponseMatch = {
  /** Substring(s) the response URL must contain — all of them. */
  urlIncludes: string | string[];
  method?: string;
  /** Expected status. Responses with any other status are reported on timeout. */
  status?: number;
  timeout?: number;
};

const DEFAULT_TIMEOUT_MS = 60000;
const FAILURES_BEFORE_GIVING_UP = 3;

const describeMatch = ({ urlIncludes, method, status }: ApiResponseMatch) => {
  const url = Array.isArray(urlIncludes) ? urlIncludes.join(' + ') : urlIncludes;
  return `${method ?? 'any'} ${url}${status ? ` → ${status}` : ''}`;
};

const describeResponse = async (response: Response) => {
  let body = '';
  try {
    body = (await response.text()).slice(0, 500);
  } catch {
    body = '<body unavailable>';
  }
  return `${response.request().method()} ${response.url()} → ${response.status()}${
    body ? `\n    ${body}` : ''
  }`;
};

/**
 * `page.waitForResponse` with the status kept OUT of the predicate.
 *
 * Gating the predicate on a success status makes an erroring API
 * indistinguishable from a slow one — the predicate never matches and the only
 * thing reported is `TimeoutError: waiting for event "response"`. This matches
 * on URL and method, remembers every response whose status was not the expected
 * one, and lists them if the wait times out.
 *
 * Matching semantics are unchanged: a mismatched status still does not resolve
 * the wait, so a request the app retries into a success still passes.
 *
 * It gives up early once the request has failed FAILURES_BEFORE_GIVING_UP
 * times — a 5xx, or a failed request (a 503 on the CORS preflight shows up as
 * `requestfailed`, never as a response).
 *
 * Register it before the action that triggers the request, as with
 * `page.waitForResponse`:
 *
 *     const responsePromise = waitForApiResponse(page, {
 *       urlIncludes: '/interventions',
 *       method: 'POST',
 *       status: 201,
 *     });
 *     await button.click();
 *     const response = await responsePromise;
 */
export const waitForApiResponse = (
  page: Page,
  match: ApiResponseMatch,
): Promise<Response> => {
  const { urlIncludes, method, status, timeout: requested = DEFAULT_TIMEOUT_MS } = match;
  // On CI the app talks to the remote staging API, which regularly takes longer
  // than the short timeouts many call sites pass (a 15s wait expiring was the
  // most common API failure). Treat the default as a floor there.
  const timeout = process.env.CI ? Math.max(requested, DEFAULT_TIMEOUT_MS) : requested;
  const fragments = Array.isArray(urlIncludes) ? urlIncludes : [urlIncludes];
  const unexpected: Response[] = [];
  const failures: string[] = [];

  const isTheRequest = (request: Request) =>
    fragments.every((fragment) => request.url().includes(fragment)) &&
    (!method || request.method() === method);

  let giveUp: (error: Error) => void = () => {};
  const apiDown = new Promise<never>((_, reject) => {
    giveUp = reject;
  });
  const recordFailure = (description: string) => {
    failures.push(description);
    if (failures.length === FAILURES_BEFORE_GIVING_UP) {
      giveUp(
        new Error(
          `API unavailable while waiting for ${describeMatch(match)}: ` +
            `the request failed ${failures.length} times:\n    ${failures.join('\n    ')}`,
        ),
      );
    }
  };
  const onRequestFailed = (request: Request) => {
    const errorText = request.failure()?.errorText ?? '';
    if (!isTheRequest(request) || /cancel|abort/i.test(errorText)) return;

    recordFailure(`${request.method()} ${request.url()} → ${errorText}`);
  };
  page.on('requestfailed', onRequestFailed);

  const response = page
    .waitForResponse((candidate) => {
      if (!isTheRequest(candidate.request())) return false;
      if (status === undefined || candidate.status() === status) return true;

      unexpected.push(candidate);
      if (candidate.status() >= 500) {
        recordFailure(`${candidate.request().method()} ${candidate.url()} → ${candidate.status()}`);
      }
      return false;
    }, { timeout })
    .catch(async (error) => {
      if (!unexpected.length) throw error;

      const received = await Promise.all(unexpected.map(describeResponse));
      throw new Error(
        `Timed out after ${timeout}ms waiting for ${describeMatch(match)}.\n` +
          `  The API answered instead:\n    ${received.join('\n    ')}`,
      );
    });

  return Promise.race([response, apiDown]).finally(() => {
    page.off('requestfailed', onRequestFailed);
  });
};

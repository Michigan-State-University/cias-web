import { Page, Response } from '@playwright/test';

export type ApiResponseMatch = {
  /** Substring(s) the response URL must contain — all of them. */
  urlIncludes: string | string[];
  method?: string;
  /** Expected status. Responses with any other status are reported on timeout. */
  status?: number;
  timeout?: number;
};

const DEFAULT_TIMEOUT_MS = 60000;

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
  const { urlIncludes, method, status, timeout = DEFAULT_TIMEOUT_MS } = match;
  const fragments = Array.isArray(urlIncludes) ? urlIncludes : [urlIncludes];
  const unexpected: Response[] = [];

  return page
    .waitForResponse((response) => {
      const isTheRequest =
        fragments.every((fragment) => response.url().includes(fragment)) &&
        (!method || response.request().method() === method);

      if (!isTheRequest) return false;
      if (status === undefined || response.status() === status) return true;

      unexpected.push(response);
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
};

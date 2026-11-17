import {
  TEST_LINK_TOKEN_PARAM,
  appendTestLinkToken,
  captureTestLinkTokenFromUrl,
  clearTestLinkToken,
  getTestLinkToken,
  hasTestLinkToken,
  testLinkTokenAppliesTo,
  withTestLinkToken,
} from 'utils/testLinkToken';

const setUrl = (url: string) => window.history.replaceState({}, '', url);

const land = (url: string) => {
  setUrl(url);
  captureTestLinkTokenFromUrl();
};

const reloadOn = (url: string) => {
  jest.resetModules();
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const reloaded = require('utils/testLinkToken');
  setUrl(url);
  reloaded.captureTestLinkTokenFromUrl();
  return reloaded;
};

describe('testLinkToken', () => {
  beforeEach(() => {
    clearTestLinkToken();
    setUrl('/');
  });

  describe('appendTestLinkToken', () => {
    it('appends the token with "?" when the url has no query', () => {
      expect(appendTestLinkToken('https://cias.app/fill', 'abc')).toEqual(
        'https://cias.app/fill?test_link_token=abc',
      );
    });

    it('appends the token with "&" when the url already has a query', () => {
      expect(
        appendTestLinkToken('https://cias.app/fill?lang=en', 'abc'),
      ).toEqual('https://cias.app/fill?lang=en&test_link_token=abc');
    });

    it('url-encodes the token', () => {
      expect(appendTestLinkToken('https://cias.app/fill', 'a b+c')).toEqual(
        'https://cias.app/fill?test_link_token=a%20b%2Bc',
      );
    });
  });

  describe('captureTestLinkTokenFromUrl', () => {
    it('returns the token and strips it from the visible url', () => {
      setUrl('/interventions/1/sessions/2/fill?lang=en&test_link_token=abc');

      expect(captureTestLinkTokenFromUrl()).toEqual('abc');
      expect(window.location.search).toEqual('?lang=en');
      expect(window.location.search).not.toContain(TEST_LINK_TOKEN_PARAM);
    });

    it('drops the "?" entirely when the token was the only query param', () => {
      setUrl('/interventions/1/sessions/2/fill?test_link_token=abc');

      captureTestLinkTokenFromUrl();

      expect(window.location.search).toEqual('');
      expect(window.location.pathname).toEqual(
        '/interventions/1/sessions/2/fill',
      );
    });

    it('keeps the hash while stripping the token', () => {
      setUrl('/fill?test_link_token=abc#section');

      captureTestLinkTokenFromUrl();

      expect(window.location.search).toEqual('');
      expect(window.location.hash).toEqual('#section');
    });

    it('keeps the captured token available after the url is stripped', () => {
      land('/fill?test_link_token=abc');

      expect(getTestLinkToken()).toEqual('abc');
    });

    it('returns null and leaves the url alone when there is no token', () => {
      setUrl('/fill?lang=en');

      expect(captureTestLinkTokenFromUrl()).toBeNull();
      expect(window.location.search).toEqual('?lang=en');
    });

    it('mirrors the token into sessionStorage so a reload does not lose the marker', () => {
      land('/fill?test_link_token=abc');

      // A reload: fresh module state, a url that no longer carries the token.
      jest.resetModules();
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const reloaded = require('utils/testLinkToken');
      reloaded.captureTestLinkTokenFromUrl();

      expect(reloaded.getTestLinkToken()).toEqual('abc');
    });

    it('survives a storage failure by keeping the token in memory', () => {
      const setItem = jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

      land('/fill?test_link_token=abc');

      expect(getTestLinkToken()).toEqual('abc');
      setItem.mockRestore();
    });
  });

  describe('withTestLinkToken', () => {
    it('adds the token at the top level of the body', () => {
      land('/fill?test_link_token=abc');

      expect(withTestLinkToken({ user_session: { session_id: '1' } })).toEqual({
        user_session: { session_id: '1' },
        test_link_token: 'abc',
      });
    });

    it('returns the body untouched when there is no token', () => {
      const body = { user_session: { session_id: '1' } };

      expect(withTestLinkToken(body)).toBe(body);
    });

    it('does not read the url lazily — an uncaptured token is not forwarded', () => {
      setUrl('/fill?test_link_token=abc');

      expect(withTestLinkToken({ a: 1 })).not.toHaveProperty(
        TEST_LINK_TOKEN_PARAM,
      );
    });
  });

  describe('hasTestLinkToken', () => {
    it('is true exactly when a token would be forwarded', () => {
      expect(hasTestLinkToken()).toBe(false);

      land('/fill?test_link_token=abc');

      expect(hasTestLinkToken()).toBe(true);
    });
  });

  describe('clearTestLinkToken', () => {
    it('drops the token from memory and from sessionStorage', () => {
      land('/fill?test_link_token=abc');

      clearTestLinkToken();

      expect(getTestLinkToken()).toBeNull();
      expect(window.sessionStorage.getItem('cias.testLinkToken')).toBeNull();
    });
  });

  // A client-side age bound used to live here and must not come back: it counted from capture
  // while the server's TTL counts from mint, so a long-open tab silently stopped sending the token.
  describe('no client-side age bound', () => {
    it('still forwards a token captured long ago', () => {
      const now = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(now);
      land('/fill?test_link_token=abc');

      (Date.now as jest.Mock).mockReturnValue(now + 24 * 60 * 60 * 1000);

      expect(getTestLinkToken()).toEqual('abc');
      expect(hasTestLinkToken()).toBe(true);
      expect(withTestLinkToken({ a: 1 })).toHaveProperty(
        TEST_LINK_TOKEN_PARAM,
        'abc',
      );

      (Date.now as jest.Mock).mockRestore();
    });

    it('keeps forwarding a token restored from sessionStorage by a later page load', () => {
      land('/fill?test_link_token=abc');

      jest.resetModules();
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const reloaded = require('utils/testLinkToken');
      reloaded.captureTestLinkTokenFromUrl();

      expect(reloaded.getTestLinkToken()).toEqual('abc');
    });
  });

  describe('testLinkTokenAppliesTo', () => {
    it('is false before anything is captured', () => {
      expect(testLinkTokenAppliesTo('1')).toBe(false);
    });

    it('is true for the intervention the token was captured on', () => {
      land('/interventions/1/sessions/2/fill?test_link_token=abc');

      expect(testLinkTokenAppliesTo('1')).toBe(true);
    });

    it('is false for a different intervention in the same tab', () => {
      land('/interventions/1/sessions/2/fill?test_link_token=abc');

      expect(testLinkTokenAppliesTo('2')).toBe(false);
    });

    it('survives a reload of the page the token landed on', () => {
      land('/interventions/1/invite?test_link_token=abc');

      const reloaded = reloadOn('/interventions/1/invite');

      expect(reloaded.getTestLinkToken()).toEqual('abc');
      expect(reloaded.testLinkTokenAppliesTo('1')).toBe(true);
    });

    it('does not follow the token to another intervention after a reload', () => {
      land('/interventions/1/invite?test_link_token=abc');

      const reloaded = reloadOn('/interventions/2/sessions/9/fill');

      expect(reloaded.testLinkTokenAppliesTo('2')).toBe(false);
    });

    it('falls back to true when neither side names an intervention', () => {
      land('/fill?test_link_token=abc');

      expect(testLinkTokenAppliesTo(null)).toBe(true);
    });

    it('is false again after the token is cleared', () => {
      land('/interventions/1/sessions/2/fill?test_link_token=abc');

      clearTestLinkToken();

      expect(testLinkTokenAppliesTo('1')).toBe(false);
      expect(
        window.sessionStorage.getItem('cias.testLinkTokenInterventionId'),
      ).toBeNull();
    });
  });

  describe('a token left over from another intervention', () => {
    it('is not forwarded on a fill of a different intervention', () => {
      land('/interventions/1/invite?test_link_token=abc');

      const reloaded = reloadOn('/interventions/2/sessions/9/fill');

      expect(reloaded.hasTestLinkToken()).toBe(false);
      expect(reloaded.withTestLinkToken({ a: 1 })).not.toHaveProperty(
        TEST_LINK_TOKEN_PARAM,
      );
    });

    it('is still forwarded on a reload of its own intervention', () => {
      land('/interventions/1/sessions/2/fill?test_link_token=abc');

      const reloaded = reloadOn('/interventions/1/sessions/2/fill');

      expect(reloaded.hasTestLinkToken()).toBe(true);
      expect(reloaded.withTestLinkToken({ a: 1 })).toHaveProperty(
        TEST_LINK_TOKEN_PARAM,
        'abc',
      );
    });
  });
});

/**
 * The capture has to run at *import* time, before `createBrowserHistory()`, to keep the token out
 * of `connected-react-router`'s store snapshot. Nothing else in the suite imports `utils/history`,
 * so without this test it could be deleted or moved below it and every spec would stay green.
 */
describe('utils/history', () => {
  it('lifts the test-link token out of the url at import time', () => {
    window.history.replaceState(
      {},
      '',
      '/interventions/i-1/sessions/s-1/fill?lang=en&test_link_token=abc',
    );

    jest.resetModules();
    /* eslint-disable global-require */
    require('utils/history');
    const testLinkToken = require('utils/testLinkToken');
    /* eslint-enable global-require */

    expect(testLinkToken.getTestLinkToken()).toEqual('abc');
    expect(window.location.search).toEqual('?lang=en');

    testLinkToken.clearTestLinkToken();
  });
});

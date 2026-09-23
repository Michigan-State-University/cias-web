import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';

import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import {
  captureTestLinkTokenFromUrl,
  clearTestLinkToken,
} from 'utils/testLinkToken';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import { verifyTestLinkTokenRequest } from 'global/reducers/testLinkToken';

import TestLinkTokenGate from '../index';

const TOKEN = 'signed.token.value';
const CHILD_ID = 'the-fill';
const INTERVENTION_ID = '1';
const OTHER_INTERVENTION_ID = '2';

const TOKEN_STORAGE_KEY = 'cias.testLinkToken';
const INTERVENTION_STORAGE_KEY = 'cias.testLinkTokenInterventionId';

const setUrl = (url: string) => window.history.replaceState({}, '', url);

const landOnTestLink = () => {
  setUrl(
    `/interventions/${INTERVENTION_ID}/sessions/2/fill?test_link_token=${TOKEN}`,
  );
  captureTestLinkTokenFromUrl();
};

const reloadOfTestLinkPage = (interventionId = INTERVENTION_ID) => {
  window.sessionStorage.setItem(TOKEN_STORAGE_KEY, TOKEN);
  window.sessionStorage.setItem(INTERVENTION_STORAGE_KEY, interventionId);
  setUrl(`/interventions/${interventionId}/sessions/2/fill`);
};

const renderGate = (
  status: TestLinkTokenStatus = TestLinkTokenStatus.PENDING,
  interventionId: Nullable<string> = INTERVENTION_ID,
) => {
  const store = createTestStore({ testLinkToken: { status } });
  // The identity reducer in `createTestStore` is the point: keep injection from swapping in the
  // real root reducer, so the status under test survives the request action the gate dispatches.
  store.replaceReducer = () => {};
  const dispatch = jest.spyOn(store, 'dispatch');

  const view = render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestLinkTokenGate interventionId={interventionId ?? undefined}>
          <div data-testid={CHILD_ID}>fill</div>
        </TestLinkTokenGate>
      </IntlProvider>
    </Provider>,
  );

  return { ...view, dispatch };
};

describe('<TestLinkTokenGate />', () => {
  beforeEach(() => {
    clearTestLinkToken();
    setUrl('/');
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderGate();
    expect(spy).not.toHaveBeenCalled();
  });

  describe('when this tab holds no test link token for this intervention', () => {
    it('renders the fill straight through', () => {
      renderGate();

      expect(screen.getByTestId(CHILD_ID)).toBeInTheDocument();
    });

    it('asks the backend nothing', () => {
      const { dispatch } = renderGate();

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('ignores a token captured for a different intervention', () => {
      reloadOfTestLinkPage(OTHER_INTERVENTION_ID);

      const { dispatch } = renderGate(
        TestLinkTokenStatus.PENDING,
        INTERVENTION_ID,
      );

      expect(screen.getByTestId(CHILD_ID)).toBeInTheDocument();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when this page load opened a test link', () => {
    beforeEach(landOnTestLink);

    it('asks the backend about the token it captured', () => {
      const { dispatch } = renderGate();

      expect(dispatch).toHaveBeenCalledWith(verifyTestLinkTokenRequest(TOKEN));
    });

    it('withholds the fill while the verdict is outstanding', () => {
      renderGate(TestLinkTokenStatus.PENDING);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
    });

    it('lets the fill through once the link is confirmed alive', () => {
      renderGate(TestLinkTokenStatus.VALID);

      expect(screen.getByTestId(CHILD_ID)).toBeInTheDocument();
    });

    it('blocks an expired link and says so', () => {
      renderGate(TestLinkTokenStatus.EXPIRED);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
      expect(
        screen.getByText(/This test link has expired/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/No session was started from this link/),
      ).toBeInTheDocument();
    });

    it('blocks an unrecognised link with different copy', () => {
      renderGate(TestLinkTokenStatus.INVALID);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
      expect(
        screen.getByText(/This test link is not valid/),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/This test link has expired/),
      ).not.toBeInTheDocument();
    });

    it('blocks when the check itself could not be made', () => {
      renderGate(TestLinkTokenStatus.UNAVAILABLE);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
      expect(
        screen.getByText(/could not check this test link/),
      ).toBeInTheDocument();
    });
  });

  describe('when the page holding a test link token is reloaded', () => {
    beforeEach(() => reloadOfTestLinkPage());

    it('still asks the backend about the stored token', () => {
      const { dispatch } = renderGate();

      expect(dispatch).toHaveBeenCalledWith(verifyTestLinkTokenRequest(TOKEN));
    });

    it('still withholds the fill while the verdict is outstanding', () => {
      renderGate(TestLinkTokenStatus.PENDING);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
    });

    it('still blocks a dead link', () => {
      renderGate(TestLinkTokenStatus.EXPIRED);

      expect(screen.queryByTestId(CHILD_ID)).not.toBeInTheDocument();
      expect(
        screen.getByText(/This test link has expired/),
      ).toBeInTheDocument();
    });
  });

  it('never mounts the page before it has asked, even on a stale VALID', () => {
    landOnTestLink();

    const order: string[] = [];
    const Child = () => {
      useEffect(() => {
        order.push('child-mount');
      }, []);
      return <div data-testid={CHILD_ID}>fill</div>;
    };

    const store = createTestStore({
      testLinkToken: { status: TestLinkTokenStatus.VALID },
    });
    store.replaceReducer = () => {};
    jest.spyOn(store, 'dispatch').mockImplementation(((action: unknown) => {
      order.push('gate-asked');
      return action;
    }) as never);

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TestLinkTokenGate interventionId={INTERVENTION_ID}>
            <Child />
          </TestLinkTokenGate>
        </IntlProvider>
      </Provider>,
    );

    expect(order).toEqual(['gate-asked', 'child-mount']);
  });
});

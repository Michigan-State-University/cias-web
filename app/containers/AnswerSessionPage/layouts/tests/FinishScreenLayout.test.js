/**
 *
 * Tests for FinishScreenLayout
 *
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { DEFAULT_LOCALE } from 'i18n';
import { createTestStore } from 'utils/testUtils/storeUtils';
import { STATE } from 'utils/localStorageService';

import { InterventionSharedTo, InterventionType } from 'models/Intervention';
import { RoutePath } from 'global/constants';

import FinishScreenLayout from '../FinishScreenLayout';
import messages from '../messages';

let mockUserSession;

jest.mock('../../selectors', () => ({
  makeSelectUserSession: () => () => mockUserSession,
  makeSelectIsRaFulfillment: () => () => false,
}));

jest.mock('global/reducers/globalState', () => ({
  makeSelectInterventionFixedElementsDirection: () => () => 'ltr',
}));

const { defaultMessage: completeSessionText } = messages.completeSession;
const { defaultMessage: goBackToModulesText } = messages.goBackToModules;
const { defaultMessage: goToNextModuleText } = messages.goToNextModule;

const formatMessage = ({ defaultMessage }) => defaultMessage;

describe('<FinishScreenLayout />', () => {
  let store;
  let history;

  beforeAll(() => {
    store = createTestStore();
  });

  beforeEach(() => {
    localStorage.clear();
    history = createMemoryHistory({ initialEntries: ['/'] });
    mockUserSession = {
      id: 'user-session-id',
      sessionId: 'session-id',
      interventionType: InterventionType.FLEXIBLE,
      sharedTo: InterventionSharedTo.ANYONE,
      userInterventionId: 'user-intervention-id',
      logoUrl: null,
      imageAlt: null,
    };
  });

  const logIn = () => localStorage.setItem(STATE, JSON.stringify({ id: 'u' }));

  const renderLayout = ({ showDashboardButton, nextSessionId = null }) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Router history={history}>
            <FinishScreenLayout
              formatMessage={formatMessage}
              question={{
                next_session_id: nextSessionId,
                settings: { show_dashboard_button: showDashboardButton },
                session_multiple_fill: false,
              }}
            />
          </Router>
        </IntlProvider>
      </Provider>,
    );

  describe('module intervention with dashboard button toggled off', () => {
    it.each([
      ['flexible order', InterventionType.FLEXIBLE],
      ['fixed order', InterventionType.FIXED],
    ])('shows only Complete Session for a guest in %s', (_, type) => {
      mockUserSession.interventionType = type;
      const { queryByText } = renderLayout({
        showDashboardButton: false,
        nextSessionId: 'next-session-id',
      });

      expect(queryByText(completeSessionText)).toBeInTheDocument();
      expect(queryByText(goBackToModulesText)).not.toBeInTheDocument();
      expect(queryByText(goToNextModuleText)).not.toBeInTheDocument();
    });

    it('shows only Complete Session for a logged in participant', () => {
      logIn();
      const { queryByText } = renderLayout({
        showDashboardButton: false,
        nextSessionId: 'next-session-id',
      });

      expect(queryByText(completeSessionText)).toBeInTheDocument();
      expect(queryByText(goBackToModulesText)).not.toBeInTheDocument();
      expect(queryByText(goToNextModuleText)).not.toBeInTheDocument();
    });

    it('navigates to the session completed page on Complete Session click', () => {
      const { getByText } = renderLayout({ showDashboardButton: false });

      fireEvent.click(getByText(completeSessionText));

      expect(history.location.pathname).toBe(RoutePath.SESSION_COMPLETED);
    });
  });

  describe('module intervention with dashboard button toggled on', () => {
    it('shows back to modules and next module buttons', () => {
      const { queryByText } = renderLayout({
        showDashboardButton: true,
        nextSessionId: 'next-session-id',
      });

      expect(queryByText(goBackToModulesText)).toBeInTheDocument();
      expect(queryByText(goToNextModuleText)).toBeInTheDocument();
      expect(queryByText(completeSessionText)).not.toBeInTheDocument();
    });

    it('shows only back to modules when there is no next session', () => {
      const { queryByText } = renderLayout({ showDashboardButton: true });

      expect(queryByText(goBackToModulesText)).toBeInTheDocument();
      expect(queryByText(goToNextModuleText)).not.toBeInTheDocument();
    });
  });

  it('shows Complete Session for a logged in participant in a sequential intervention', () => {
    logIn();
    mockUserSession.interventionType = InterventionType.DEFAULT;
    const { queryByText } = renderLayout({ showDashboardButton: false });

    expect(queryByText(completeSessionText)).toBeInTheDocument();
    expect(queryByText(goBackToModulesText)).not.toBeInTheDocument();
  });
});

/**
 *
 * Tests for FinishScreen
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE } from 'i18n';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import LocalStorageService from 'utils/localStorageService';
import { Roles } from 'models/User/RolesManager';
import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import FinishScreen from '../FinishScreen';

describe('<FinishScreen />', () => {
  LocalStorageService.setState({ roles: [Roles.participant] });
  const defaultProps = {
    selectAnswer: jest.fn(),
    formatMessage,
    question: {},
  };

  const initialState = {
    AnswerSessionPage: {
      userSession: {
        id: 'test',
      },
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <FinishScreen {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <FinishScreen {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

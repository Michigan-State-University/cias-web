import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import createModalForTests from 'utils/createModalForTests';
import SettingsInterventionPage from '../index';

describe('<SettingsInterventionPage />', () => {
  beforeEach(() => {
    createModalForTests();
  });
  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    getSession: jest.fn(),
    editSession: jest.fn(),
    getQuestions: jest.fn(),
  };

  const initialState = {
    session: {
      session: {
        id: '12ad120dj012-3a',
        name: 'e-Session Name',
        settings: {
          narrator: {
            voice: true,
            animation: true,
          },
        },
      },
      loaders: {
        getSession: false,
        createSession: false,
        editSession: false,
      },
    },
  };
  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SettingsInterventionPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SettingsInterventionPage {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import SettingsInterventionPage from '../index';

describe('<SettingsInterventionPage />', () => {
  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    getIntervention: jest.fn(),
    editIntervention: jest.fn(),
    getQuestions: jest.fn(),
  };

  const initialState = {
    intervention: {
      intervention: {
        id: '12ad120dj012-3a',
        name: 'e-Intervention Name',
        settings: {
          narrator: {
            voice: true,
            animation: true,
          },
        },
      },
      loaders: {
        getIntervention: false,
        createIntervention: false,
        editIntervention: false,
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

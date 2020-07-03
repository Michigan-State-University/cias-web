import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, browserHistory } from 'react-router-dom';

import configureStore from 'configureStore';

import { DEFAULT_LOCALE } from 'i18n';
import SettingsInterventionPage from '../index';

describe('<SettingsInterventionPage />', () => {
  let store;

  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    getIntervention: jest.fn(),
    editIntervention: jest.fn(),
    getQuestions: jest.fn(),
  };
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

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

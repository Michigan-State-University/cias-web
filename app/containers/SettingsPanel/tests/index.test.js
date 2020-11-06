/**
 *
 * Tests for SettingsPanel
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_LOCALE } from 'i18n';
import { createTestStore } from 'utils/testUtils/storeUtils';

import SettingsPanel from '../index';

describe('<SettingsPanel />', () => {
  const initialState = {
    problem: {
      problem: {
        name: 'Name of the intervention',
        id: 'as120s-as12cs',
      },
      loaders: {
        fetchProblemLoading: false,
      },
      errors: {
        fetchProblemError: null,
      },
    },
  };
  const store = createTestStore(initialState);

  const defaultProps = {
    match: { params: { problem: { id: 'as120s-as12cs' } } },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <SettingsPanel {...defaultProps} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

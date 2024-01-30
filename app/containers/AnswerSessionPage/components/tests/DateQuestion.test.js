/**
 *
 * Tests for DateQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { DEFAULT_LOCALE } from 'i18n';

import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import DateQuestion from '../DateQuestion';

describe('<DateQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
    formatMessage,
    showError: jest.fn(),
  };

  let store;
  beforeAll(() => {
    store = createTestStore();
  });

  const defaultProps = {
    question: {
      body: {
        variable: 'test',
      },
    },
    answerBody: [],
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <DateQuestion {...defaultProps} />
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
            <DateQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

/**
 *
 * Tests for SingleQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';
import SingleQuestion from '../SingleQuestion';

describe('<SingleQuestion />', () => {
  const store = createTestStore({});

  const mockedFunctions = {
    selectAnswer: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        data: [
          {
            payload: 'test',
            value: '1',
          },
          {
            payload: 'test',
            value: '2',
          },
        ],
        variable: '1',
      },
      id: 'test-id',
      settings: {
        proceed_button: true,
      },
    },
    questionIndex: 0,
    answerBody: [],
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <SingleQuestion {...defaultProps} />
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
            <SingleQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

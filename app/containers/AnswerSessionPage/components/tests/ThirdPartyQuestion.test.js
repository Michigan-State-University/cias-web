/**
 *
 * Tests for ThirdPartyQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';

import { createTestStore } from 'utils/testUtils/storeUtils';

import ThirdPartyQuestion from '../ThirdPartyQuestion';

describe('<ThirdPartyQuestion />', () => {
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
            value: 'example1@mail.com',
          },
          {
            payload: 'test',
            value: 'example2@mail.com',
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
            <ThirdPartyQuestion {...defaultProps} />
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
            <ThirdPartyQuestion {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

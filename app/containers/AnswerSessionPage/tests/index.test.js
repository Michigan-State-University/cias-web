/**
 *
 * Tests for AnswerSessionPage
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import { AnswerSessionPage } from '../index';

describe('<AnswerSessionPage />', () => {
  const mockedFunctions = {
    fetchIntervention: jest.fn(),
    createUserSession: jest.fn(),
    nextQuestion: jest.fn(),
  };

  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    fetchIntervention: mockedFunctions.fetchIntervention,
    createUserSession: mockedFunctions.createUserSession,
    nextQuestion: mockedFunctions.nextQuestion,
    AnswerSessionPage: {
      sessionQuestions: [],
    },
  };
  const initialState = {
    AnswerSessionPage: {
      questionLoading: false,
      questionError: '',
      sessionQuestions: [],
      questionIndex: 0,
      answersLoading: false,
      answersError: '',
      answers: {},
    },
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AnswerSessionPage {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AnswerSessionPage {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

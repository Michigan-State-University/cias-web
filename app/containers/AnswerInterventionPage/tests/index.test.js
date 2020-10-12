/**
 *
 * Tests for AnswerInterventionPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { AnswerInterventionPageWithIntl as AnswerInterventionPage } from '../index';

describe('<AnswerInterventionPage />', () => {
  const mockedFunctions = {
    fetchProblem: jest.fn(),
    fetchQuestionsAction: jest.fn(),
  };

  const defaultProps = {
    match: { params: { id: '12ad120dj012-3a' } },
    fetchQuestionsAction: mockedFunctions.fetchQuestionsAction,
    fetchProblem: mockedFunctions.fetchProblem,
    answerInterventionPage: {
      interventionQuestions: [],
    },
  };
  const reducer = state => state;
  const initialState = {
    answerInterventionPage: {
      questionLoading: false,
      questionError: '',
      interventionQuestions: [],
      questionIndex: 0,
      answersLoading: false,
      answersError: '',
      answers: {},
    },
  };

  let store;
  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <AnswerInterventionPage {...defaultProps} />
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
            <AnswerInterventionPage {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

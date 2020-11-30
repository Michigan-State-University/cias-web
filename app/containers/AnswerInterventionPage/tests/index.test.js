/**
 *
 * Tests for AnswerInterventionPage
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

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
      sessionQuestions: [],
    },
  };
  const initialState = {
    answerInterventionPage: {
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

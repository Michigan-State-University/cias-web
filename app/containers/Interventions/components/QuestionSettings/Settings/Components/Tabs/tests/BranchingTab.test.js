/**
 *
 * Tests for BranchingTab
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { multiQuestion, gridQuestion } from 'models/Intervention/QuestionTypes';
import { createProblem, createQuestion } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';

import { createTestStore } from 'utils/testUtils/storeUtils';
import BranchingTab from '../BranchingTab';

describe('<BranchingTab />', () => {
  const mockFunctions = {
    formatMessage,
    onFormulaUpdate: jest.fn(),
    onAddCase: jest.fn(),
    onRemoveCase: jest.fn(),
    onUpdateCase: jest.fn(),
    fetchProblem: jest.fn(),
  };

  const initialState = {
    questions: {
      questions: [
        createQuestion(),
        createQuestion(1, multiQuestion.id),
        createQuestion(2, gridQuestion.id),
      ],
    },
    problem: {
      loaders: {
        fetchProblemLoading: false,
      },
      problem: createProblem(),
    },
  };

  const defaultProps = {
    formula: { payload: '', patterns: [] },
    id: 'test',
    disabled: false,
    ...mockFunctions,
  };

  const store = createTestStore(initialState);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <BranchingTab {...defaultProps} />
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
            <BranchingTab {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

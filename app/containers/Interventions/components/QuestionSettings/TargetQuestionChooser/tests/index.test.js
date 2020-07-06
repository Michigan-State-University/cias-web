import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { createStore } from 'redux';
import TargetQuestionChooser from '../index';

describe('<TargetQuestionChooser />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    editInterventionPage: {
      intervention: {
        name: 'e-Intervention Name',
      },
      interventionList: [],
      questions: [],
    },
  };

  const props = {
    onClick: jest.fn(),
    pattern: { match: '', target: '' },
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
  });

  it('should match the snapshot', () => {
    const renderedComponent = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render list of questions with id of the selected one', () => {
    const question = mockSingleQuestion(2, true);

    store = createStore(reducer, {
      editInterventionPage: {
        intervention: {
          name: 'e-Intervention Name',
        },
        interventionList: [],
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: 1,
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const variableComponentList = getAllByTestId(
      `${question.id}-select-target-question`,
    );

    expect(variableComponentList).toHaveLength(3);
  });
});

const mockSingleQuestion = (suffix = 1, hasVariable = true) => ({
  id: `test-id-${suffix}`,
  title: `Test title ${suffix}`,
  type: 'Question::Single',
  body: {
    variable: { name: hasVariable ? `var_single_${suffix}` : '' },
  },
});

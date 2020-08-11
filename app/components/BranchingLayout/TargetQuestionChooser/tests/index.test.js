import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { createStore } from 'redux';

import { interventionReducer } from 'global/reducers/intervention';
import { problemReducer } from 'global/reducers/problem';

import editInterventionPageReducer from 'containers/Interventions/containers/EditInterventionPage/reducer';
import TargetQuestionChooser from '../index';

const mockSingleQuestion = (suffix = 1, hasVariable = true) => ({
  id: `test-id-${suffix}`,
  title: `Test title ${suffix}`,
  type: 'Question::Single',
  body: {
    variable: { name: hasVariable ? `var_single_${suffix}` : '' },
  },
});

const mockIntervention = (suffix = 1) => ({
  id: `intervention-test-id-${suffix}`,
  name: `Intervention test title ${suffix}`,
});

describe('<TargetQuestionChooser />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    intervention: {
      intervention: {
        name: 'e-Intervention Name',
        id: 'asd12ca-daiud12',
      },
    },
    problem: {
      problem: { interventions: [] },
      loaders: {
        fetchProblemLoading: false,
      },
    },
    editInterventionPage: {
      questions: [mockSingleQuestion(1, true)],
      selectedQuestion: 0,
    },
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      editInterventionPage: editInterventionPageReducer,
    };
    store.injectedSagas = {};
  });

  const props = {
    onClick: jest.fn(),
    pattern: { match: '', target: { id: '', match: '' } },
  };

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
      intervention: {
        intervention: {
          name: 'e-Intervention Name',
          id: 'asd12ca-daiud12',
        },
      },
      problem: {
        problem: { interventions: [] },
        loaders: {
          fetchProblemLoading: false,
        },
      },
      editInterventionPage: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: 1,
      },
    });

    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      editInterventionPage: editInterventionPageReducer,
    };
    store.injectedSagas = {};

    const { getAllByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const variableComponentList = getAllByTestId(
      `${question.id}-select-target-question-el`,
    );

    expect(variableComponentList).toHaveLength(3);
  });

  it('should render intervention view with list of interventions when selected', () => {
    const question = mockSingleQuestion(2, true);

    store = createStore(reducer, {
      intervention: {
        intervention: {
          name: 'e-Intervention Name',
          id: 'asd12ca-daiud12',
        },
      },

      problem: {
        problem: {
          interventions: [
            mockIntervention(1),
            mockIntervention(2),
            mockIntervention(3),
          ],
        },
        loaders: {
          fetchProblemLoading: false,
        },
      },
      editInterventionPage: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: 1,
      },
    });
    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      editInterventionPage: editInterventionPageReducer,
      problem: problemReducer,
    };
    store.injectedSagas = {};

    const {
      getAllByTestId,
      getByTestId,
      queryAllByTestId,
      queryByTestId,
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const interventionViewSetter = getByTestId(
      `${question.id}-select-target-question-interview-view-setter`,
    );
    fireEvent.click(interventionViewSetter);

    const variableComponentList = queryAllByTestId(
      `${question.id}-select-target-question-el`,
    );
    const questionView = queryByTestId(`${question.id}-select-target-question`);

    const interventionComponentList = getAllByTestId(
      `${question.id}-select-target-intervention-el`,
    );
    const interventionView = getByTestId(
      `${question.id}-select-target-intervention`,
    );

    expect(questionView).toEqual(null);
    expect(variableComponentList).toHaveLength(0);

    expect(interventionView).not.toEqual(null);
    expect(interventionComponentList).toHaveLength(3);
  });

  it.only('should render spinner on intervention view when loading a list', () => {
    const question = mockSingleQuestion(2, true);

    store = createStore(reducer, {
      intervention: {
        intervention: {
          name: 'e-Intervention Name',
          id: 'asd12ca-daiud12',
        },
      },
      problem: {
        problem: { interventions: [] },
        loaders: {
          fetchProblemLoading: true,
        },
      },
      editInterventionPage: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: 1,
      },
    });

    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      editInterventionPage: editInterventionPageReducer,
    };
    store.injectedSagas = {};

    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const interventionViewSetter = getByTestId(
      `${question.id}-select-target-question-interview-view-setter`,
    );
    fireEvent.click(interventionViewSetter);

    const interventionViewSpinner = getByTestId(
      `${question.id}-select-target-intervention-spinner`,
    );

    expect(interventionViewSpinner).not.toEqual(null);
  });
});

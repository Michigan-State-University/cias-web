import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { TRANSITION_TIMEOUT } from 'components/Collapse/CollapsableContent';

import { interventionReducer } from 'global/reducers/session';
import { problemReducer } from 'global/reducers/intervention';
import { questionsReducer } from 'global/reducers/questions';
import { localStateReducer } from 'global/reducers/localState';
import { questionGroupsReducer } from 'global/reducers/questionGroups';

import { createTestStore } from 'utils/testUtils/storeUtils';
import TargetQuestionChooser from '../index';

const executeAfterTransition = func =>
  setTimeout(() => func(), TRANSITION_TIMEOUT);

const mockSingleQuestion = (suffix = 1, hasVariable = true) => ({
  id: `test-id-${suffix}`,
  title: `Question test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
  type: 'Question::Single',
  question_group_id: `group-test-id-${suffix}`,
  body: {
    variable: { name: hasVariable ? `var_single_${suffix}` : '' },
  },
});

const mockSingleGroup = (suffix = 1) => ({
  id: `group-test-id-${suffix}`,
  title: `Group test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
});

const mockIntervention = (suffix = 1) => ({
  id: `intervention-test-id-${suffix}`,
  name: `Intervention test title ${suffix}`,
});

const mockMostUsedStore = question => {
  const store = createTestStore({
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
    questions: {
      questions: [
        mockSingleQuestion(1, true),
        question,
        mockSingleQuestion(3, true),
      ],
      selectedQuestion: question.id,
    },
    questionGroups: {
      groups: [mockSingleGroup(1), mockSingleGroup(2), mockSingleGroup(3)],
    },
  });
  store.injectedReducers = {
    intervention: interventionReducer,
    questions: questionsReducer,
    localState: localStateReducer,
    problem: problemReducer,
    questionGroups: questionGroupsReducer,
  };
  return store;
};

describe('<TargetQuestionChooser />', () => {
  let store;
  const mockQuestion = mockSingleQuestion(1, true);
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
    questions: {
      questions: [mockQuestion],
      selectedQuestion: mockQuestion.id,
    },
    questionGroups: {
      groups: [mockSingleGroup(1)],
    },
  };

  beforeAll(() => {
    store = createTestStore(initialState);
    store.injectedReducers = {
      intervention: interventionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
    };
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
    const group = mockSingleGroup(2);

    store = createTestStore({
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
      questions: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: question.id,
      },
      questionGroups: {
        groups: [mockSingleGroup(1), mockSingleGroup(2), mockSingleGroup(3)],
      },
    });

    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
    };
    store.injectedSagas = {};

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const groupRow = getByTestId(`${group.id}-select-target-group-el`);
    fireEvent.click(groupRow);

    executeAfterTransition(() => {
      const variableComponentList = getAllByTestId(
        `${question.id}-select-target-question-el`,
      );

      expect(variableComponentList).toHaveLength(3);
    });
  });

  it('should render intervention view with list of interventions when selected', () => {
    const question = mockSingleQuestion(2, true);

    store = createTestStore({
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
      questions: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: question.id,
      },
    });
    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
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
      /^.+-select-target-intervention-el-\d+$/,
    );
    const interventionView = getByTestId(
      `${question.id}-select-target-intervention`,
    );

    expect(questionView).toEqual(null);
    expect(variableComponentList).toHaveLength(0);

    expect(interventionView).not.toEqual(null);
    expect(interventionComponentList).toHaveLength(3);
  });

  it('should render spinner on intervention view when loading a list', () => {
    const question = mockSingleQuestion(2, true);

    store = createTestStore({
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
      questions: {
        questions: [
          mockSingleQuestion(1, true),
          question,
          mockSingleQuestion(3, true),
        ],
        selectedQuestion: question.id,
      },
    });

    store.runSaga = () => {};
    store.injectedReducers = {
      intervention: interventionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
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

  it('should invoke onClick when question is selected', () => {
    const newProps = { ...props, onClick: jest.fn(), isVisible: false };
    const question = mockSingleQuestion(2, true);
    const group = mockSingleGroup(2);

    store = mockMostUsedStore(question);
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...newProps} />
        </IntlProvider>
      </Provider>,
    );
    const groupRow = getByTestId(`${group.id}-select-target-group-el`);
    fireEvent.click(groupRow);

    executeAfterTransition(() => {
      const questionRow = getByTestId(
        `${question.id}-select-target-question-el`,
      );
      fireEvent.click(questionRow);
      expect(newProps.onClick).toHaveBeenCalledWith({
        type: 'Question',
        id: 'test-id-1',
      });
    });
  });

  it('should invoke onClick when intervention is selected', () => {
    const newProps = { ...props, onClick: jest.fn(), isVisible: false };
    const question = mockSingleQuestion(2, true);
    store = mockMostUsedStore(question);
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...newProps} />
        </IntlProvider>
      </Provider>,
    );
    const img = getByTestId(
      `${question.id}-select-target-question-interview-view-setter`,
    );
    fireEvent.click(img);
    const interventionRow = getByTestId(
      `${question.id}-select-target-intervention-el-0`,
    );
    fireEvent.click(interventionRow);
    expect(newProps.onClick).toHaveBeenCalledWith({
      type: 'Intervention',
      id: 'intervention-test-id-1',
    });
  });

  it('should invoke onClick when next question is selected', () => {
    const newProps = { ...props, onClick: jest.fn(), isVisible: false };
    const question = mockSingleQuestion(2, true);
    store = mockMostUsedStore(question);
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...newProps} />
        </IntlProvider>
      </Provider>,
    );
    const nextQuestion = getByTestId(`${question.id}-next-question-target`);
    fireEvent.click(nextQuestion);
    expect(newProps.onClick).toHaveBeenCalledWith({
      type: 'Question',
      id: 'test-id-3',
    });
  });
});

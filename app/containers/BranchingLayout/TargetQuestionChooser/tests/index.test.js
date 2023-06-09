import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { TRANSITION_TIMEOUT } from 'components/Collapse/CollapsableContent';

import { sessionReducer } from 'global/reducers/session';
import { interventionReducer } from 'global/reducers/intervention';
import { questionsReducer } from 'global/reducers/questions';
import { localStateReducer } from 'global/reducers/localState';
import { questionGroupsReducer } from 'global/reducers/questionGroups';

import { createTestStore } from 'utils/testUtils/storeUtils';
import TargetQuestionChooser from '../index';

const executeAfterTransition = (func) =>
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
  position: suffix,
});

const mockSingleGroup = (suffix = 1) => ({
  id: `group-test-id-${suffix}`,
  title: `Group test title ${suffix}`,
  subtitle: `Test subtitle ${suffix}`,
  position: suffix,
});

const mockSession = (suffix = 1) => ({
  id: `session-test-id-${suffix}`,
  name: `Session test title ${suffix}`,
  position: suffix,
});

const mockMostUsedStore = (question) => {
  const store = createTestStore({
    session: {
      session: {
        name: 'e-Session Name',
        id: 'asd12ca-daiud12',
        position: 1,
      },
    },

    intervention: {
      currentSessionIndex: 0,
      intervention: {
        sessions: [mockSession(1), mockSession(2), mockSession(3)],
      },
      loaders: {
        fetchInterventionLoading: false,
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
    session: sessionReducer,
    questions: questionsReducer,
    localState: localStateReducer,
    intervention: interventionReducer,
    questionGroups: questionGroupsReducer,
  };
  return store;
};

describe('<TargetQuestionChooser />', () => {
  let store;
  const mockQuestion = mockSingleQuestion(1, true);
  const initialState = {
    session: {
      session: {
        name: 'e-Session Name',
        id: 'asd12ca-daiud12',
      },
    },
    intervention: {
      currentSessionIndex: 0,
      intervention: { sessions: [] },
      loaders: {
        fetchInterventionLoading: false,
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
      session: sessionReducer,
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

  it('should render list of questions without id of the selected one', () => {
    const question = mockSingleQuestion(2, true);
    const group = mockSingleGroup(2);

    store = createTestStore({
      session: {
        session: {
          name: 'e-Session Name',
          id: 'asd12ca-daiud12',
        },
      },
      intervention: {
        currentSessionIndex: 0,
        intervention: { sessions: [] },
        loaders: {
          fetchInterventionLoading: false,
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
      session: sessionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
    };
    store.injectedSagas = {};

    const { queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...props} />
        </IntlProvider>
      </Provider>,
    );

    const groupRow = queryByTestId(`${group.id}-select-target-group-el`);
    expect(groupRow).toBeNull();
  });

  it.skip('should render session view with list of sessions without current session when selected', () => {
    const question = mockSingleQuestion(2, true);

    store = createTestStore({
      session: {
        session: {
          name: 'e-Session Name',
          id: 'asd12ca-daiud12',
          position: 1,
        },
      },

      intervention: {
        currentSessionIndex: 0,
        intervention: {
          sessions: [mockSession(1), mockSession(2), mockSession(3)],
        },
        loaders: {
          fetchInterventionLoading: false,
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
      session: sessionReducer,
      questions: questionsReducer,
      localState: localStateReducer,
      intervention: interventionReducer,
    };
    store.injectedSagas = {};

    const { getAllByTestId, getByTestId, queryAllByTestId, queryByTestId } =
      render(
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
      /^.+-select-target-session-el-\d+$/,
    );
    const interventionView = getByTestId(
      `${question.id}-select-target-session`,
    );

    expect(questionView).toEqual(null);
    expect(variableComponentList).toHaveLength(0);

    expect(interventionView).not.toEqual(null);
    expect(interventionComponentList).toHaveLength(2);
  });

  it('should render spinner on session view when loading a list', () => {
    const question = mockSingleQuestion(2, true);

    store = createTestStore({
      session: {
        session: {
          name: 'e-Session Name',
          id: 'asd12ca-daiud12',
        },
      },
      intervention: {
        currentSessionIndex: 0,
        intervention: { sessions: [] },
        loaders: {
          fetchInterventionLoading: true,
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
      session: sessionReducer,
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
      `${question.id}-select-target-session-spinner`,
    );

    expect(interventionViewSpinner).not.toEqual(null);
  });

  it.skip('should invoke onClick when question is selected', () => {
    const newProps = { ...props, onClick: jest.fn(), isVisible: false };
    const selectedQuestion = mockSingleQuestion(2, true);
    const groupToSelect = mockSingleGroup(3);
    const questionToSelect = mockSingleQuestion(3, true);

    store = mockMostUsedStore(selectedQuestion);
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <TargetQuestionChooser {...newProps} />
        </IntlProvider>
      </Provider>,
    );
    const groupRow = getByTestId(`${groupToSelect.id}-select-target-group-el`);
    fireEvent.click(groupRow);

    executeAfterTransition(() => {
      const questionRow = getByTestId(
        `${questionToSelect.id}-select-target-question-el`,
      );
      fireEvent.click(questionRow);
      expect(newProps.onClick).toHaveBeenCalledWith({
        type: 'Question::Single',
        id: 'test-id-1',
      });
    });
  });

  it('should invoke onClick when session is selected', () => {
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
      `${question.id}-select-target-session-el-0`,
    );
    fireEvent.click(interventionRow);
    expect(newProps.onClick).toHaveBeenCalledWith({
      type: 'Session',
      id: 'session-test-id-2',
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
      type: 'Question::Single',
      id: 'test-id-3',
    });
  });
});

import { createSelector } from 'reselect';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

import {
  nameQuestion,
  participantReport,
  phoneQuestion,
  thirdPartyQuestion,
  tlfbQuestion,
  henryFordInitialScreen,
} from 'models/Session/QuestionTypes';
import { getEditVariables } from 'models/Session/utils';

import { initialState } from './reducer';

export const selectQuestions = (state) => state.questions || initialState;

export const makeSelectQuestionsState = () =>
  createSelector(selectQuestions, (substate) => substate);

export const makeSelectQuestions = () =>
  createSelector(selectQuestions, (substate) => substate.questions);

export const makeSelectFilteredQuestions = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions.filter(({ type }) => type !== participantReport.id),
  );

export const makeSelectSelectedQuestionId = () =>
  createSelector(selectQuestions, (substate) => substate.selectedQuestion);

export const makeSelectLoaders = () =>
  createSelector(selectQuestions, (substate) => substate.loaders);

export const makeSelectLoader = (loader) =>
  createSelector(selectQuestions, (substate) =>
    get(substate.loaders, loader, false),
  );

export const makeSelectError = (error) =>
  createSelector(selectQuestions, (substate) =>
    get(substate.errors, error, false),
  );

export const makeSelectQuestionsLength = () =>
  createSelector(selectQuestions, (substate) => substate.questions.length);

export const makeSelectSelectedQuestionType = () =>
  createSelector(selectQuestions, (substate) =>
    get(
      substate.questions.find(({ id }) => id === substate.selectedQuestion),
      'type',
      null,
    ),
  );

export const makeSelectGroupQuestions = (id) =>
  createSelector(selectQuestions, (substate) =>
    substate.questions.filter(
      ({ question_group_id: questionGroupId }) => questionGroupId === id,
    ),
  );

export const makeSelectVisibleGroupsSize = () =>
  createSelector(
    selectQuestions,
    (substate) => uniqBy(substate.questions, 'question_group_id').length,
  );

export const makeSelectSelectedQuestion = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions.find(({ id }) => id === substate.selectedQuestion),
  );

export const makeSelectSelectedQuestionGroupId = () =>
  createSelector(
    makeSelectSelectedQuestion(),
    (selectedQuestion) => selectedQuestion?.question_group_id,
  );

export const makeSelectSelectedQuestionFromCache = () =>
  createSelector(selectQuestions, (substate) =>
    substate.cache.questions.find(({ id }) => id === substate.selectedQuestion),
  );

export const makeSelectQuestionById = (questionId) =>
  createSelector(selectQuestions, (substate) =>
    substate.questions.find(({ id }) => id === questionId),
  );

export const makeSelectQuestionByIdFromCache = (questionId) =>
  createSelector(selectQuestions, (substate) =>
    substate.cache.questions.find(({ id }) => id === questionId),
  );

export const makeSelectNameQuestionExists = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions?.some((elem) => elem.type === nameQuestion.id),
  );

export const makeSelectParticipantReportQuestionExists = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions?.some((elem) => elem.type === participantReport.id),
  );

export const makeSelectThirdPartyReportQuestionExists = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions?.some((elem) => elem.type === thirdPartyQuestion.id),
  );

export const makeSelectPhoneQuestionExists = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions?.some((elem) => elem.type === phoneQuestion.id),
  );

export const makeSelectHenryFordInitialScreenExists = () =>
  createSelector(selectQuestions, (substate) =>
    substate.questions?.some((elem) => elem.type === henryFordInitialScreen.id),
  );

export const makeSelectLastCreatedQuestionId = () =>
  createSelector(selectQuestions, (substate) => substate.lastCreatedQuestionId);

export const makeSelectTlfbVariables = () =>
  createSelector(selectQuestions, (substate) =>
    getEditVariables(
      substate.questions.filter(({ type }) => type === tlfbQuestion.id),
    ),
  );

import { createSelector } from 'reselect';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

import {
  nameQuestion,
  participantReport,
  thirdPartyQuestion,
} from 'models/Session/QuestionTypes';
import { initialState } from './reducer';

export const selectQuestions = state => state.questions || initialState;

export const makeSelectQuestionsState = () =>
  createSelector(
    selectQuestions,
    substate => substate,
  );

export const makeSelectQuestions = () =>
  createSelector(
    selectQuestions,
    substate => substate.questions,
  );

export const makeSelectPreviousQuestions = () =>
  createSelector(
    selectQuestions,
    substate => {
      const questions = [];
      substate.questions.some(question => {
        if (question.id !== substate.selectedQuestion) {
          questions.push(question);
          return false;
        }
        return true;
      });
      return questions;
    },
  );

export const makeSelectFilteredQuestions = () =>
  createSelector(
    selectQuestions,
    substate =>
      substate.questions.filter(({ type }) => type !== participantReport.id),
  );

export const makeSelectSelectedQuestionId = () =>
  createSelector(
    selectQuestions,
    substate => substate.selectedQuestion,
  );

export const makeSelectSelectedQuestion = () =>
  createSelector(
    selectQuestions,
    substate =>
      substate.questions.find(({ id }) => id === substate.selectedQuestion),
  );

export const makeSelectLoaders = () =>
  createSelector(
    selectQuestions,
    substate => substate.loaders,
  );

export const makeSelectLoader = loader =>
  createSelector(
    selectQuestions,
    substate => get(substate.loaders, loader, false),
  );

export const makeSelectQuestionsLength = () =>
  createSelector(
    selectQuestions,
    substate => substate.questions.length,
  );

export const makeSelectSelectedQuestionType = () =>
  createSelector(
    selectQuestions,
    substate =>
      get(
        substate.questions.find(({ id }) => id === substate.selectedQuestion),
        'type',
        null,
      ),
  );

export const makeSelectGroupQuestions = id =>
  createSelector(
    selectQuestions,
    substate =>
      substate.questions.filter(
        ({ question_group_id: questionGroupId }) => questionGroupId === id,
      ),
  );

export const makeSelectVisibleGroupsSize = () =>
  createSelector(
    selectQuestions,
    substate => uniqBy(substate.questions, 'question_group_id').length,
  );

export const makeSelectQuestionById = questionId =>
  createSelector(
    selectQuestions,
    substate => substate.questions.find(({ id }) => id === questionId),
  );

export const makeSelectNameQuestionExists = () =>
  createSelector(
    selectQuestions,
    substate => substate.questions?.some(elem => elem.type === nameQuestion.id),
  );

export const makeSelectParticipantReportQuestionExists = () =>
  createSelector(
    selectQuestions,
    substate =>
      substate.questions?.some(elem => elem.type === participantReport.id),
  );

export const makeSelectThirdPartyReportQuestionExists = () =>
  createSelector(
    selectQuestions,
    substate =>
      substate.questions?.some(elem => elem.type === thirdPartyQuestion.id),
  );

export const makeSelectLastCreatedQuestionId = () =>
  createSelector(
    selectQuestions,
    substate => substate.lastCreatedQuestionId,
  );

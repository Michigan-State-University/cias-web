import produce from 'immer';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import values from 'lodash/values';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';

import questionDataReducer from 'containers/Sessions/components/QuestionData/reducer';
import questionSettingsReducer from 'containers/Sessions/components/QuestionSettings/Settings/reducer';
import instantiateEmptyQuestion from 'utils/instantiateEmptyQuestion';
import { insertAt, removeAt } from 'utils/arrayUtils';
import { assignFromQuestionTTS } from 'utils/tts';

import {
  assignDraftItems,
  assignDraftItemsById,
  updateItemById,
} from 'utils/reduxUtils';
import {
  CLEAR_ERROR,
  SELECT_QUESTION,
  CREATE_QUESTION_SUCCESS,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  ADD_QUESTION_IMAGE_REQUEST,
  ADD_QUESTION_IMAGE_SUCCESS,
  ADD_QUESTION_IMAGE_ERROR,
  DELETE_QUESTION_IMAGE_REQUEST,
  DELETE_QUESTION_IMAGE_SUCCESS,
  DELETE_QUESTION_IMAGE_ERROR,
  COPY_QUESTION_REQUEST,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  CHANGE_QUESTION_TYPE_REQUEST,
  CHANGE_QUESTION_TYPE_SUCCESS,
  CHANGE_QUESTION_TYPE_ERROR,
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_SUCCESS,
  REORDER_QUESTION_LIST_ERROR,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
  DELETE_QUESTIONS_REQUEST,
  DELETE_QUESTIONS_SUCCESS,
  DELETE_QUESTIONS_ERROR,
  COPY_EXTERNALLY_QUESTION_REQUEST,
  COPY_EXTERNALLY_QUESTION_SUCCESS,
  COPY_EXTERNALLY_QUESTION_ERROR,
  UPDATE_QUESTION_IMAGE_REQUEST,
  UPDATE_QUESTION_IMAGE_SUCCESS,
  UPDATE_QUESTION_IMAGE_ERROR,
  CREATE_QUESTIONS_SUCCESS,
} from './constants';

import {
  mapQuestionDataForType,
  editQuestionSuccessCommon,
  editQuestionErrorCommon,
  getNewQuestionIdInNextGroups,
  getNewQuestionIdInsideGroup,
  getNewQuestionIdInPreviousGroups,
} from './utils';
import {
  GROUP_QUESTIONS_SUCCESS,
  DUPLICATE_GROUPS_HERE_SUCCESS,
  DUPLICATE_GROUPS_HERE_REQUEST,
  DUPLICATE_GROUPS_HERE_ERROR,
  GET_QUESTION_GROUPS_REQUEST,
} from '../questionGroups/constants';

export const initialState = {
  selectedQuestion: '',
  lastCreatedQuestionId: null,
  questions: [],
  cache: {
    questions: [],
  },
  loaders: {
    getQuestionsLoading: true,
    updateQuestionLoading: false,
  },
  errors: {
    updateQuestionError: null,
  },
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
export const questionsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CLEAR_ERROR:
        draft.errors.updateQuestionError = null;
        break;

      case GET_QUESTION_GROUPS_REQUEST:
        draft.questions = [];
        draft.cache.questions = [];
        break;

      case SELECT_QUESTION:
        draft.selectedQuestion = action.payload.id;
        break;

      case CREATE_QUESTION_SUCCESS:
        draft.questions = [
          ...state.questions,
          mapQuestionDataForType(action.payload.question),
        ];
        assignDraftItems(draft.questions, draft.cache.questions);
        draft.selectedQuestion = action.payload.question.id;
        draft.lastCreatedQuestionId = action.payload.question.id;
        break;

      case CREATE_QUESTIONS_SUCCESS: {
        const {
          payload: { questions },
        } = action;

        const firstCreatedQuestion = questions[0];
        const mappedQuestions = questions.map(mapQuestionDataForType);
        draft.questions.push(...mappedQuestions);
        assignDraftItems(draft.questions, draft.cache.questions);

        draft.selectedQuestion = firstCreatedQuestion.id;
        draft.lastCreatedQuestionId = firstCreatedQuestion.id;
        break;
      }

      case GET_QUESTIONS_REQUEST:
        draft.loaders.getQuestionsLoading = true;
        break;
      case GET_QUESTIONS_SUCCESS:
        draft.loaders.getQuestionsLoading = false;
        const { questionToSelectId } = action.payload;
        draft.selectedQuestion =
          questionToSelectId ??
          (action.payload.questions.length !== 0
            ? action.payload.questions[0].id
            : '');
        draft.questions = action.payload.questions.map((question) =>
          mapQuestionDataForType(question),
        );
        assignDraftItems(draft.questions, draft.cache.questions);
        break;
      case GET_QUESTIONS_ERROR:
        draft.loaders.getQuestionsLoading = false;
        break;

      case EDIT_QUESTION_REQUEST: {
        draft.errors.updateQuestionError = null;
        draft.loaders.updateQuestionLoading = true;
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );

        const updatedQuestion = set(
          cloneDeep(state.questions[questionIndex]),
          action.payload.path,
          action.payload.value,
        );

        draft.questions[questionIndex] = assignFromQuestionTTS(updatedQuestion);
        break;
      }

      case EDIT_QUESTION_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case EDIT_QUESTION_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_REQUEST: {
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex].image_url = action.payload.imageUrl;
        break;
      }
      case ADD_QUESTION_IMAGE_SUCCESS:
        editQuestionSuccessCommon(draft, action.payload);
        break;

      case ADD_QUESTION_IMAGE_ERROR:
        editQuestionErrorCommon(draft, action.payload);
        break;

      case DELETE_QUESTION_IMAGE_REQUEST: {
        draft.loaders.updateQuestionLoading = true;
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex].image_url = null;
        break;
      }
      case DELETE_QUESTION_IMAGE_SUCCESS:
        draft.loaders.updateQuestionLoading = false;
        editQuestionSuccessCommon(draft, action.payload);
        break;
      case DELETE_QUESTION_IMAGE_ERROR:
        draft.loaders.updateQuestionLoading = false;
        editQuestionErrorCommon(draft, action.payload);
        break;

      case UPDATE_QUESTION_IMAGE_REQUEST:
        draft.errors.updateQuestionError = null;
        draft.loaders.updateQuestionLoading = true;
        updateItemById(
          draft.questions,
          action.payload.questionId,
          (question) => ({
            ...question,
            image_alt: action.payload.description,
          }),
        );
        break;
      case UPDATE_QUESTION_IMAGE_SUCCESS:
        draft.errors.updateQuestionError = null;
        draft.loaders.updateQuestionLoading = false;
        assignDraftItemsById(
          draft.questions,
          draft.cache.questions,
          action.payload.questionId,
        );
        break;
      case UPDATE_QUESTION_IMAGE_ERROR:
        draft.loaders.updateQuestionLoading = false;
        assignDraftItemsById(
          draft.cache.questions,
          draft.questions,
          action.payload.questionId,
        );
        editQuestionErrorCommon(draft, action.payload);
        break;

      case COPY_QUESTION_REQUEST:
        break;
      case COPY_QUESTION_SUCCESS:
        draft.questions = [
          ...state.questions,
          mapQuestionDataForType(action.payload.question),
        ];
        assignDraftItems(draft.questions, draft.cache.questions);
        draft.selectedQuestion = action.payload.question.id;
        break;
      case COPY_QUESTION_ERROR:
        break;

      case CHANGE_QUESTION_TYPE_REQUEST: {
        const questionIndex = state.questions.findIndex(
          ({ id }) => id === state.selectedQuestion,
        );
        draft.questions[questionIndex] = {
          ...draft.questions[questionIndex],
          ...instantiateEmptyQuestion(
            draft.questions[questionIndex].title,
            action.payload.newType,
          ),
          formulas: [{ payload: '', patterns: [] }],
        };
        break;
      }

      case CHANGE_QUESTION_TYPE_SUCCESS:
        assignDraftItems(draft.questions, draft.cache.questions);
        break;

      case CHANGE_QUESTION_TYPE_ERROR:
        assignDraftItems(draft.cache.questions, draft.questions);
        break;

      case REORDER_QUESTION_LIST_REQUEST: {
        const {
          sourceIndex,
          destinationIndex,
          sourceGroupId,
          destinationGroupId,
        } = action.payload;

        const groupedQuestions = groupBy(
          state.questions,
          (question) => question.question_group_id,
        );
        const sourceQuestion = {
          ...groupedQuestions[sourceGroupId][sourceIndex],
          question_group_id: destinationGroupId,
        };

        removeAt(groupedQuestions[sourceGroupId], sourceIndex);

        insertAt(
          groupedQuestions[destinationGroupId],
          destinationIndex,
          sourceQuestion,
        );

        const groupKeys = keys(groupedQuestions);

        forEach(groupKeys, (groupKey) => {
          groupedQuestions[groupKey] = groupedQuestions[groupKey].map(
            (question, index) => ({
              ...question,
              position: index + 1,
            }),
          );
        });

        draft.questions = concat(...values(groupedQuestions));

        break;
      }

      case REORDER_QUESTION_LIST_SUCCESS:
        assignDraftItems(draft.questions, draft.cache.questions);
        break;

      case REORDER_QUESTION_LIST_ERROR:
        assignDraftItems(draft.cache.questions, draft.questions);
        break;

      case DELETE_QUESTIONS_REQUEST: {
        const { questionIds, groupIds } = action.payload;
        const filteredQuestions = state.questions.filter(
          (question) => !questionIds.includes(question.id),
        );
        const firstDeletedQuestion = state.questions.find(
          ({ id }) => id === questionIds[0],
        );
        draft.questions = filteredQuestions;

        const questions = [...filteredQuestions, firstDeletedQuestion];

        const groupIndex = groupIds.findIndex(
          (index) => index === firstDeletedQuestion.groupId,
        );

        const newIdInsideGroup = getNewQuestionIdInsideGroup(
          questions,
          firstDeletedQuestion.question_group_id,
          firstDeletedQuestion.id,
        );

        if (newIdInsideGroup) {
          draft.selectedQuestion = newIdInsideGroup;
          return draft;
        }

        const previewGroupsQuestionId = getNewQuestionIdInPreviousGroups(
          questions,
          groupIndex,
          groupIds,
        );

        if (previewGroupsQuestionId) {
          draft.selectedQuestion = previewGroupsQuestionId;
          return draft;
        }

        const nextGroupsQuestionId = getNewQuestionIdInNextGroups(
          questions,
          groupIndex,
          groupIds,
          firstDeletedQuestion.id,
        );

        if (nextGroupsQuestionId) {
          draft.selectedQuestion = nextGroupsQuestionId;
          return draft;
        }

        break;
      }

      case DELETE_QUESTIONS_SUCCESS: {
        assignDraftItems(draft.questions, draft.cache.questions);
        break;
      }

      case DELETE_QUESTIONS_ERROR: {
        assignDraftItems(draft.cache.questions, draft.questions);
        break;
      }

      case DELETE_QUESTION_REQUEST: {
        const {
          payload: { questionId, groupId, groupIds },
        } = action;
        const { questions } = state;
        draft.questions = draft.questions.filter(
          (question) => question.id !== questionId,
        );
        const newIdInsideGroup = getNewQuestionIdInsideGroup(
          questions,
          groupId,
          questionId,
        );

        if (newIdInsideGroup) {
          draft.selectedQuestion = newIdInsideGroup;
          return draft;
        }

        const groupIndex = groupIds.findIndex((index) => index === groupId);

        const previewGroupsQuestionId = getNewQuestionIdInPreviousGroups(
          questions,
          groupIndex,
          groupIds,
        );

        if (previewGroupsQuestionId) {
          draft.selectedQuestion = previewGroupsQuestionId;
          return draft;
        }

        const nextGroupsQuestionId = getNewQuestionIdInNextGroups(
          questions,
          groupIndex,
          groupIds,
          questionId,
        );

        if (nextGroupsQuestionId) {
          draft.selectedQuestion = nextGroupsQuestionId;
          return draft;
        }

        break;
      }

      case DELETE_QUESTION_SUCCESS:
        assignDraftItems(draft.questions, draft.cache.questions);
        break;

      case DELETE_QUESTION_ERROR:
        assignDraftItems(draft.cache.questions, draft.questions);
        break;

      case UPDATE_QUESTION_DATA: {
        draft.errors.updateQuestionError = null;
        draft.loaders.updateQuestionLoading = true;

        const questionId = get(action, 'payload.data.questionId', undefined);
        const selectedQuestionIndex = draft.questions.findIndex(
          ({ id }) => id === (questionId || draft.selectedQuestion),
        );

        const updatedQuestion = {
          ...state.questions[selectedQuestionIndex],
          ...questionDataReducer(
            state.questions[selectedQuestionIndex],
            action.payload,
          ),
        };

        draft.questions[selectedQuestionIndex] =
          assignFromQuestionTTS(updatedQuestion);
        break;
      }

      case UPDATE_QUESTION_SETTINGS: {
        draft.errors.updateQuestionError = null;
        draft.loaders.updateQuestionLoading = true;

        const selectedQuestionIndex = draft.questions.findIndex(
          ({ id }) => id === draft.selectedQuestion,
        );

        const updatedQuestion = questionSettingsReducer(
          state.questions[selectedQuestionIndex],
          action.payload,
          state.questions,
        );

        draft.questions[selectedQuestionIndex] = assignFromQuestionTTS(
          cloneDeep(updatedQuestion),
        );
        break;
      }
      case GROUP_QUESTIONS_SUCCESS: {
        draft.questions = draft.questions.map((question) => ({
          ...question,
          question_group_id: action.payload.questionIds.includes(question.id)
            ? action.payload.group.id
            : question.question_group_id,
        }));
        assignDraftItems(draft.questions, draft.cache.questions);
        break;
      }
      case COPY_EXTERNALLY_QUESTION_REQUEST:
        draft.loaders.updateQuestionLoading = true;
        break;
      case COPY_EXTERNALLY_QUESTION_SUCCESS:
        draft.loaders.updateQuestionLoading = false;
        const { isCurrent, question } = action.payload;
        if (isCurrent) draft.questions.push(question);
        assignDraftItems(draft.questions, draft.cache.questions);
        break;
      case COPY_EXTERNALLY_QUESTION_ERROR:
        draft.loaders.updateQuestionLoading = false;
        assignDraftItems(draft.cache.questions, draft.questions);
        break;
      case DUPLICATE_GROUPS_HERE_REQUEST:
        draft.loaders.updateQuestionLoading = true;
        break;
      case DUPLICATE_GROUPS_HERE_SUCCESS:
        const { questions } = action.payload;
        draft.questions.push(...questions.map(mapQuestionDataForType));
        assignDraftItems(draft.questions, draft.cache.questions);
        draft.loaders.updateQuestionLoading = false;
        break;
      case DUPLICATE_GROUPS_HERE_ERROR:
        draft.loaders.updateQuestionLoading = false;
        assignDraftItems(draft.cache.questions, draft.questions);
        break;
    }
  });

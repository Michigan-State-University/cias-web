import produce from 'immer';
import set from 'lodash/set';

import {
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  COPY_QUESTION_ERROR,
  ADD_QUESTION_IMAGE_SUCCESS,
  ADD_QUESTION_IMAGE_ERROR,
  DELETE_QUESTION_IMAGE_SUCCESS,
  DELETE_QUESTION_IMAGE_ERROR,
  REORDER_QUESTION_LIST_SUCCESS,
  REORDER_QUESTION_LIST_ERROR,
  COPY_QUESTION_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  EDIT_QUESTION_REQUEST,
  COPY_QUESTION_REQUEST,
  UPDATE_QUESTION_DATA,
  DELETE_QUESTION_REQUEST,
  UPDATE_QUESTION_SETTINGS,
  ADD_QUESTION_IMAGE_REQUEST,
  CREATE_QUESTION_REQUEST,
  REORDER_QUESTION_LIST_REQUEST,
  DELETE_QUESTION_IMAGE_REQUEST,
  UPDATE_QUESTION_IMAGE_REQUEST,
  UPDATE_QUESTION_IMAGE_SUCCESS,
  UPDATE_QUESTION_IMAGE_ERROR,
} from 'global/reducers/questions/constants';
import {
  ADD_REPORT_TEMPLATE_SUCCESS,
  DELETE_REPORT_TEMPLATE_SUCCESS,
} from 'global/reducers/reportTemplates/constants';
import {
  CREATE_TEXT_MESSAGE_SUCCESS,
  REMOVE_TEXT_MESSAGE_SUCCESS,
} from 'global/reducers/textMessages/constants';

import objectToCamelCase from 'utils/objectToCamelCase';
import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  EDIT_SESSION_REQUEST,
  EDIT_SESSION_SUCCESS,
  EDIT_SESSION_ERROR,
  BULK_EDIT_SESSION_REQUEST,
} from './constants';

export const initialState = {
  session: {
    name: '',
    type: '',
    questions: [],
    settings: {},
  },
  sessionSaving: false,
  loaders: {
    createSession: false,
    getSession: false,
    editSession: false,
  },
  cache: {
    session: {
      name: '',
      type: '',
      questions: [],
      settings: {},
    },
  },
  errors: {
    getSession: null,
  },
};

const saving = [
  EDIT_SESSION_REQUEST,
  EDIT_QUESTION_REQUEST,
  COPY_QUESTION_REQUEST,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
  DELETE_QUESTION_REQUEST,
  ADD_QUESTION_IMAGE_REQUEST,
  DELETE_QUESTION_IMAGE_REQUEST,
  REORDER_QUESTION_LIST_REQUEST,
  CREATE_QUESTION_REQUEST,
  UPDATE_QUESTION_IMAGE_REQUEST,
  BULK_EDIT_SESSION_REQUEST,
];
const saved = [
  EDIT_SESSION_SUCCESS,
  EDIT_SESSION_ERROR,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  ADD_QUESTION_IMAGE_SUCCESS,
  ADD_QUESTION_IMAGE_ERROR,
  DELETE_QUESTION_IMAGE_SUCCESS,
  DELETE_QUESTION_IMAGE_ERROR,
  REORDER_QUESTION_LIST_SUCCESS,
  REORDER_QUESTION_LIST_ERROR,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
  UPDATE_QUESTION_IMAGE_SUCCESS,
  UPDATE_QUESTION_IMAGE_ERROR,
];

/* eslint-disable default-case, no-param-reassign */
const sessionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    if (saving.includes(action.type)) draft.sessionSaving = true;
    if (saved.includes(action.type)) draft.sessionSaving = false;
    switch (action.type) {
      case GET_SESSION_REQUEST:
        draft.loaders.getSession = true;
        draft.errors.getSession = null;
        break;
      case GET_SESSION_SUCCESS:
        draft.loaders.getSession = false;
        draft.errors.getSession = null;
        draft.session = action.payload.session;
        draft.cache.session = action.payload.session;
        break;
      case GET_SESSION_ERROR:
        draft.loaders.getSession = false;
        draft.errors.getSession = action.payload.error;
        break;

      case EDIT_SESSION_REQUEST:
        set(draft.session, action.payload.path, action.payload.value);
        break;
      case BULK_EDIT_SESSION_REQUEST:
        let newSession = action.payload.session;
        if (action.payload.session.catTests) {
          const { catTests, ...rest } = action.payload.session;
          newSession = {
            ...rest,
            catMhTestTypes: catTests.map((id) => ({ id })),
          };
        }
        draft.session = { ...state.session, ...newSession };
        break;
      case EDIT_SESSION_SUCCESS:
        draft.session = objectToCamelCase(action.payload.session);
        draft.cache.session = action.payload.session;
        break;
      case EDIT_SESSION_ERROR:
        draft.session = state.cache.session;
        break;

      case ADD_REPORT_TEMPLATE_SUCCESS:
        draft.session.reportTemplatesCount += 1;
        break;
      case DELETE_REPORT_TEMPLATE_SUCCESS:
        draft.session.reportTemplatesCount -= 1;
        break;

      case CREATE_TEXT_MESSAGE_SUCCESS:
        draft.session.smsPlansCount += 1;
        break;

      case REMOVE_TEXT_MESSAGE_SUCCESS:
        draft.session.smsPlansCount -= 1;
    }
  });

export { sessionReducer };

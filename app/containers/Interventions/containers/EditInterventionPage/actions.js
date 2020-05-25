/*
 *
 * CreateInterventionPage actions
 *
 */

import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  ADD_QUESTION,
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
} from './constants';
import { actionBuilder } from '../../../../utils/actionBuilder';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

const addQuestionRequest = type => actionBuilder(ADD_QUESTION, type);
const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);
const updateQuestionTitle = title =>
  actionBuilder(UPDATE_QUESTION_TITLE, title);
const updateQuestionData = data => actionBuilder(UPDATE_QUESTION_DATA, data);

const createInterventionRequest = () =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, {});
const createInterventionSuccess = token =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, token);
const createInterventionError = () =>
  actionBuilder(CREATE_INTERVENTION_ERROR, {});

export {
  toggleQuestionTypeChooser,
  addQuestionRequest,
  selectQuestion,
  updateQuestionData,
  updateQuestionTitle,
  createInterventionRequest,
  createInterventionSuccess,
  createInterventionError,
};

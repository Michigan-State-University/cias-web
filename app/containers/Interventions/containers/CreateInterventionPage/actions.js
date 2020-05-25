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
} from './constants';
import { actionBuilder } from '../../../../utils/actionBuilder';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

const addQuestionRequest = type => actionBuilder(ADD_QUESTION, type);
const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);
const updateQuestionTitle = title =>
  actionBuilder(UPDATE_QUESTION_TITLE, title);
const updateQuestionData = data => actionBuilder(UPDATE_QUESTION_DATA, data);

export {
  toggleQuestionTypeChooser,
  addQuestionRequest,
  selectQuestion,
  updateQuestionData,
  updateQuestionTitle,
};

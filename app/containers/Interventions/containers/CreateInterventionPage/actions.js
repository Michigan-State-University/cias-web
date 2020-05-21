/*
 *
 * CreateInterventionPage actions
 *
 */

import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  ADD_QUESTION,
  SELECT_QUESTION,
} from './constants';
import { actionBuilder } from '../../../../utils/actionBuilder';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

const addQuestionRequest = type => actionBuilder(ADD_QUESTION, type);
const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);

export { toggleQuestionTypeChooser, addQuestionRequest, selectQuestion };

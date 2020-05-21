/*
 *
 * CreateInterventionPage actions
 *
 */

import { TOGGLE_QUESTION_TYPE_CHOOSER, ADD_QUESTION } from './constants';
import { actionBuilder } from '../../../../utils/actionBuilder';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

const addQuestionRequest = type => actionBuilder(ADD_QUESTION, type);

export { toggleQuestionTypeChooser, addQuestionRequest };

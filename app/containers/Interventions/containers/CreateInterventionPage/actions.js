/*
 *
 * CreateInterventionPage actions
 *
 */

import { TOGGLE_QUESTION_TYPE_CHOOSER } from './constants';
import { actionBuilder } from '../../../../utils/actionBuilder';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

export { toggleQuestionTypeChooser };

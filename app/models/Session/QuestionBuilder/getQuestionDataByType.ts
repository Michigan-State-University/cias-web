import { QuestionDTO, QuestionTypes } from 'models/Question';
import { nameQuestion } from '../QuestionTypes';

export const getQuestionDataByType = (
  type: QuestionTypes,
): QuestionDTO['body'] => {
  switch (type) {
    case QuestionTypes.SINGLE:
      return {
        variable: { name: '' },
        data: [{ payload: '', value: '1' }],
      };

    case QuestionTypes.MULTIPLE:
      return {
        data: [{ payload: '', variable: { name: '', value: '1' } }],
      };

    case QuestionTypes.GRID:
      return {
        data: [
          {
            payload: {
              rows: [
                { variable: { name: '' }, payload: '' },
                { variable: { name: '' }, payload: '' },
              ],
              columns: [
                { variable: { value: '1' }, payload: '' },
                { variable: { value: '2' }, payload: '' },
              ],
            },
          },
        ],
      };

    case QuestionTypes.SLIDER:
      return {
        variable: { name: '' },
        data: [
          {
            payload: { start_value: '', end_value: '' },
          },
        ],
      };

    case QuestionTypes.INFORMATION:
      return {
        data: [],
      };

    case QuestionTypes.FEEDBACK:
      return {
        data: [
          {
            payload: { start_value: '', end_value: '', target_value: '' },
            spectrum: { payload: '', patterns: [] },
          },
        ],
      };

    case QuestionTypes.NAME:
      return {
        data: [{ payload: '' }],
        variable: { name: nameQuestion.reservedVariable },
      };

    case QuestionTypes.THIRD_PARTY:
      return {
        data: [{ payload: '', value: '', report_template_ids: [] }],
      };

    case QuestionTypes.TLFB_CONFIG:
      return {
        data: [
          {
            payload: { days_count: '' },
          },
        ],
      };

    case QuestionTypes.TLFB_QUESTION:
      return {
        data: [
          {
            payload: {
              question_title: '',
              head_question: '',
              substance_question: '',
              substances_with_group: false,
              substances: [],
            },
          },
        ],
      };

    case QuestionTypes.TLFB_EVENTS:
      return {
        data: [{ payload: { screen_title: '', screen_question: '' } }],
      };

    default:
      return {
        variable: { name: '' },
        data: [{ payload: '' }],
      };
  }
};

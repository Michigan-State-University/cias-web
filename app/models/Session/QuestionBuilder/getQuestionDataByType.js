import {
  singleQuestion,
  multiQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  informationQuestion,
  feedbackQuestion,
  nameQuestion,
  thirdPartyQuestion,
  tlfbConfig,
  tlfbEvents,
  tlfbQuestion,
} from '../QuestionTypes';

export const getQuestionDataByType = (type) => {
  switch (type) {
    case singleQuestion.id:
      return {
        variable: { name: '' },
        data: [{ payload: '', value: '1' }],
      };

    case multiQuestion.id:
      return {
        data: [{ payload: '', variable: { name: '', value: '1' } }],
      };

    case gridQuestion.id:
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

    case visualAnalogueScaleQuestion.id:
      return {
        variable: { name: '' },
        data: [
          {
            payload: { start_value: '', end_value: '' },
          },
        ],
      };

    case informationQuestion.id:
      return {
        data: [],
      };

    case feedbackQuestion.id:
      return {
        data: [
          {
            payload: { start_value: '', end_value: '', target_value: '' },
            spectrum: { payload: '', patterns: [] },
          },
        ],
      };

    case nameQuestion.id:
      return {
        data: [{ payload: '' }],
        variable: { name: nameQuestion.reservedVariable },
      };

    case thirdPartyQuestion.id:
      return {
        data: [{ payload: '', value: '', report_template_ids: [] }],
      };

    case tlfbConfig.id:
    case tlfbQuestion.id:
      return {
        data: [],
      };

    case tlfbEvents.id:
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

import {
  singleQuestion,
  multiQuestion,
  gridQuestion,
  visualAnalogueScaleQuestion,
  informationQuestion,
  feedbackQuestion,
  nameQuestion,
  thirdPartyQuestion,
} from '../QuestionTypes';

export const getQuestionDataByType = type => {
  switch (type) {
    case singleQuestion.id:
      return {
        variable: { name: '' },
        data: [{ payload: '', value: '' }],
      };

    case multiQuestion.id:
      return {
        data: [{ payload: '', variable: { name: '', value: '' } }],
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
                { variable: { value: '' }, payload: '' },
                { variable: { value: '' }, payload: '' },
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
        data: [{ payload: '', value: '' }],
      };

    default:
      return {
        variable: { name: '' },
        data: [{ payload: '' }],
      };
  }
};

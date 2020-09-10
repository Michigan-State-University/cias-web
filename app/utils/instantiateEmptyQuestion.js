import {
  gridQuestion,
  visualAnalogueScaleQuestion,
  multiQuestion,
  singleQuestion,
  informationQuestion,
  feedbackQuestion,
} from 'models/Intervention/QuestionTypes';
import Question from 'models/Intervention/Question';

const instantiateEmptyQuestion = (message, type) => {
  switch (type) {
    case singleQuestion.id:
      return new Question(message, type, {
        variable: { name: '' },
        data: [{ payload: '', value: '' }],
      });

    case multiQuestion.id:
      return new Question(message, type, {
        data: [{ payload: '', variable: { name: '', value: '' } }],
      });

    case gridQuestion.id:
      return new Question(message, type, {
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
      });

    case visualAnalogueScaleQuestion.id:
      return new Question(message, type, {
        variable: { name: '' },
        data: [
          {
            payload: { start_value: '', end_value: '' },
          },
        ],
      });

    case informationQuestion.id:
      return new Question(message, type, {
        data: [],
      });

    case feedbackQuestion.id:
      return new Question(message, type, {
        data: [
          {
            payload: { start_value: '', end_value: '', target_value: '' },
            spectrum: { payload: '', patterns: [] },
          },
        ],
      });

    default:
      return new Question(message, type, {
        variable: { name: '' },
        data: [{ payload: '' }],
      });
  }
};

export default instantiateEmptyQuestion;

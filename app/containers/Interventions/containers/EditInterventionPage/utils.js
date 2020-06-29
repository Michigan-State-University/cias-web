import {
  gridQuestion,
  visualAnalogueScaleQuestion,
} from 'models/Intervention/QuestionTypes';
import Question from 'models/Intervention/Question';

const instantiateEmptyQuestion = (message, type) => {
  switch (type) {
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
                { variable: { value: '1' }, payload: '' },
                { variable: { value: '1' }, payload: '' },
              ],
            },
          },
        ],
      });

    case visualAnalogueScaleQuestion.id:
      return new Question(message, type, {
        data: [
          {
            variable: { name: '', value: '1' },
            payload: { start_value: '', end_value: '' },
          },
        ],
      });

    default:
      return new Question(message, type, {
        data: [{ variable: { name: '', value: '1' }, payload: '' }],
      });
  }
};

export default instantiateEmptyQuestion;

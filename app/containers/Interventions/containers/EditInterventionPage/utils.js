import {
  gridQuestion,
  visualAnalogueScaleQuestion,
  multiQuestion,
  singleQuestion,
  informationQuestion,
  textboxQuestion,
  numberQuestion,
} from 'models/Intervention/QuestionTypes';
import Question from 'models/Intervention/Question';

export const instantiateEmptyQuestion = (message, type) => {
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

    default:
      return new Question(message, type, {
        variable: { name: '' },
        data: [{ payload: '' }],
      });
  }
};

export const mapQuestionDataForType = question => {
  switch (question.type) {
    case textboxQuestion.id:
    case numberQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [{ variable: { name: '', value: '1' }, payload: '' }],
        },
      };

    case gridQuestion.id:
      return {
        ...question,
        body: {
          ...question.body,
          data: question.body.data.length
            ? question.body.data
            : [
                {
                  variable: { name: '', value: '1' },
                  payload: {
                    rows: [],
                    columns: [],
                  },
                },
              ],
        },
      };

    default:
      return question;
  }
};

export const getAnimationPosition = (draft, state, payload) => {
  if (draft.selectedQuestion !== payload) {
    // set position to first block of new question
    if (state.questions[payload].narrator.blocks[0])
      return state.questions[payload].narrator.blocks[0].position.posTo;
    for (let i = payload - 1; i >= 0; i -= 1) {
      const {
        narrator: { blocks: previousQuestionBlocks },
      } = state.questions[i];
      const lastBlock =
        previousQuestionBlocks[previousQuestionBlocks.length - 1];
      if (lastBlock) {
        return lastBlock.position.posTo;
      }
    }
    return { x: 0, y: 0 };
  }
};

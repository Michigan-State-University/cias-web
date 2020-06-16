import {
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_ROW,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  DELETE_ROW,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const gridQuestionReducer = (question, payload) => {
  switch (payload.type) {
    case ADD_ROW:
      question.body.data[0].payload.rows.push({
        variable: { name: '' },
        payload: '',
      });
      return question;

    case ADD_COLUMN:
      question.body.data[0].payload.columns.push({
        variable: { value: '1' },
        payload: '',
      });
      return question;

    case UPDATE_COLUMN:
      question.body.data[0].payload.columns[payload.data.index] = {
        ...question.body.data[0].payload.columns[payload.data.index],
        payload: payload.data.payload,
      };
      return question;

    case UPDATE_ROW:
      question.body.data[0].payload.rows[payload.data.index] = {
        ...question.body.data[0].payload.rows[payload.data.index],
        payload: payload.data.payload,
      };
      return question;

    case DELETE_COLUMN:
      question.body.data[0].payload.columns.splice(payload.data.index, 1);
      return question;

    case DELETE_ROW:
      question.body.data[0].payload.rows.splice(payload.data.index, 1);
      return question;

    default:
      return question;
  }
};

export default gridQuestionReducer;

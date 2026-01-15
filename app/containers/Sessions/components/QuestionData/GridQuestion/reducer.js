import { calculateNextValue } from 'utils/sequenceUtils';

import {
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_ROW,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  DELETE_ROW,
  REORDER_ROWS,
  REORDER_COLUMNS,
} from './constants';

/* eslint-disable default-case, no-param-reassign, default-param-last */
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
        variable: {
          value: `${calculateNextValue(
            question.body.data[0].payload.columns.map(
              ({ variable: { value } }) => +value,
            ),
          )}`,
        },
        payload: '',
      });
      return question;

    case UPDATE_COLUMN:
      question.body.data[0].payload.columns[payload.data.index] = {
        ...question.body.data[0].payload.columns[payload.data.index],
        ...payload.data.value,
      };
      return question;

    case UPDATE_ROW:
      question.body.data[0].payload.rows[payload.data.index] = {
        ...question.body.data[0].payload.rows[payload.data.index],
        ...payload.data.value,
      };
      return question;

    case DELETE_COLUMN:
      question.body.data[0].payload.columns.splice(payload.data.index, 1);
      return question;

    case DELETE_ROW:
      question.body.data[0].payload.rows.splice(payload.data.index, 1);
      return question;

    case REORDER_ROWS:
      question.body.data[0].payload.rows = payload.data.items;
      return question;

    case REORDER_COLUMNS:
      question.body.data[0].payload.columns = payload.data.items;
      return question;

    default:
      return question;
  }
};

export default gridQuestionReducer;

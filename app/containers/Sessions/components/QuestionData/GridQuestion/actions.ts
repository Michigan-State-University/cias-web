import { updateQuestionData } from 'global/reducers/questions';
import { GridQuestionColumn, GridQuestionRow } from 'models/Question';

import { REORDER_COLUMNS, REORDER_ROWS } from './constants';

export const reorderRowsAction = (items: GridQuestionRow[]) =>
  updateQuestionData({ type: REORDER_ROWS, data: { items } });

export const reorderColumnsAction = (items: GridQuestionColumn[]) =>
  updateQuestionData({ type: REORDER_COLUMNS, data: { items } });

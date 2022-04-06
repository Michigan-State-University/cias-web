import produce from 'immer';

import { TlfbConfigDTO } from 'models/Question';
import { getDiffBetweenDatesInDays } from 'utils/dateUtils';

import {
  UPDATE_DAYS_COUNT,
  UPDATE_RANGE_SETTINGS,
  UPDATE_DATE_RANGE,
  UPDATE_DISPLAY_HELPING_MATERIALS,
} from './constants';
import { TlfbConfigAction } from './types';

/* eslint-disable no-param-reassign */
const tlfbConfigReducer = (
  question: TlfbConfigDTO,
  { type, data }: TlfbConfigAction['payload'],
) =>
  produce(question, (draft) => {
    switch (type) {
      case UPDATE_DAYS_COUNT: {
        const { daysCount } = data;
        draft.body.data[0].payload.days_count = daysCount;
        break;
      }

      case UPDATE_RANGE_SETTINGS: {
        const { selected } = data;
        draft.body.data[0].payload.choose_date_range = selected;
        if (!selected) {
          draft.body.data[0].payload.start_date = '';
          draft.body.data[0].payload.end_date = '';
        }
        break;
      }

      case UPDATE_DATE_RANGE: {
        const { startDate, endDate } = data;
        draft.body.data[0].payload.start_date = startDate?.toISOString() || '';
        draft.body.data[0].payload.end_date = endDate?.toISOString() || '';
        if (startDate && endDate) {
          const diffDays = getDiffBetweenDatesInDays(startDate, endDate);
          draft.body.data[0].payload.days_count = `${diffDays}`;
        }
        break;
      }

      case UPDATE_DISPLAY_HELPING_MATERIALS: {
        const { displayHelpingMaterials } = data;
        draft.body.data[0].payload.display_helping_materials =
          displayHelpingMaterials;
        break;
      }

      default:
        break;
    }
  });

export default tlfbConfigReducer;

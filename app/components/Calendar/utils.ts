import {
  MAX_VISIBLE_EVENTS_SMALL,
  MAX_VISIBLE_EVENTS_MEDIUM,
  MAX_VISIBLE_EVENTS_LARGE,
} from './constants';

export const getNumberOfEventsVisible = (calendarRows: number) => {
  switch (true) {
    case calendarRows === 5:
      return MAX_VISIBLE_EVENTS_MEDIUM;
    case calendarRows > 5:
      return MAX_VISIBLE_EVENTS_SMALL;
    case calendarRows < 5:
      return MAX_VISIBLE_EVENTS_LARGE;
    default:
      return MAX_VISIBLE_EVENTS_MEDIUM;
  }
};

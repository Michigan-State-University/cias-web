import { CalendarData } from 'models/Tlfb';

import { CalendarDataResponseItem } from './types';

export const mapCalendarDataResponse = (
  calendarDataResponse: CalendarDataResponseItem[],
): CalendarData =>
  calendarDataResponse.reduce(
    (calendarData: CalendarData, { date, events, consumptionResult }) => ({
      ...calendarData,
      [date]: {
        events,
        answer: consumptionResult,
      },
    }),
    {},
  );

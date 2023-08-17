import dayjs from 'dayjs';
import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { TlfbConfigBody } from 'models/Question';
import { CalendarData } from 'models/Tlfb';
import { PhoneAttributes } from 'models/Phone';

import { CamelToSnake } from 'global/types/camelToSnake';
import { fullDayToYearFormatter } from 'utils/formatters';

export const getSessionMapUserPreviewUrl = (userSessionId: string): string => {
  const {
    location: { pathname },
  } = window;
  const previewIndex = pathname.indexOf('preview');
  const sessionUrl = pathname.slice(0, previewIndex - 1);
  return `${sessionUrl}/map?userSessionId=${userSessionId}`;
};

export const getNextSessionUrl = (sessionId: string): string => {
  const {
    location: { pathname },
  } = window;

  return pathname.replace(/\/sessions\/.*/, `/sessions/${sessionId}/fill`);
};

const generateGridCellId = (prefix: string, index: number) =>
  `${prefix}-${index}`;

export const generateGridAnswerId = (index: number) =>
  `${generateGridCellId('answer', index)}`;
export const generateGridQuestionId = (index: number) =>
  `${generateGridCellId('question', index)}`;

const getOldestDate = (dates: CalendarData) =>
  dayjs.min(
    Object.keys(dates).map((dayString) =>
      dayjs(dayString, fullDayToYearFormatter),
    ),
  );

export const getTlfbDateRange = (tlfbConfig: CamelToSnake<TlfbConfigBody>) => {
  const {
    data: [
      {
        payload: {
          days_count: daysCount,
          choose_date_range: chooseDateRange,
          start_date: startDate,
          end_date: endDate,
        },
      },
    ],
  } = tlfbConfig;

  if (chooseDateRange)
    return {
      startDate: dayjs(startDate),
      endDate: dayjs(endDate),
    };

  return {
    startDate: dayjs().subtract(+daysCount, 'day'),
    endDate: dayjs().subtract(1, 'day'),
  };
};

export const getCalendarMetadata = (
  tlfbConfig: CamelToSnake<TlfbConfigBody>,
  calendarData: CalendarData,
) => {
  const { startDate, endDate } = getTlfbDateRange(tlfbConfig);
  const oldestFilledDate = getOldestDate(calendarData);
  const datesWithAnswers = pickBy(calendarData, (date) => !isNil(date.answer));
  const oldestFilledAnswerDate = getOldestDate(datesWithAnswers);
  const isEveryAnswerFilled =
    oldestFilledAnswerDate?.isSame(startDate, 'day') ?? false;
  const isMultiMonth = !endDate.isSame(startDate, 'month');

  return {
    startDate,
    endDate,
    oldestFilledDate,
    oldestFilledAnswerDate,
    isEveryAnswerFilled,
    isMultiMonth,
  };
};

export const formatPhoneNumberForHfhs = ({
  number,
  iso,
}: Pick<PhoneAttributes, 'number' | 'iso'>) => {
  const parsedPhone = parsePhoneNumberFromString(number, iso);
  if (!parsedPhone) return '';
  return parsedPhone
    .formatInternational()
    .replace(new RegExp(' ', 'g'), '-')
    .slice(1);
};

export const parsePhoneNumberFromHfhs = (number: string) => {
  const phone = `+${number.replace(new RegExp('-', 'g'), ' ')}`;
  return parsePhoneNumberFromString(phone);
};

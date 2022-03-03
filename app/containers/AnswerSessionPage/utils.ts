import dayjs from 'dayjs';
import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';

import { fullDayToYearFormatter } from 'utils/formatters';
import { TlfbConfigBody } from 'models/Question';
import { CamelToSnake } from 'global/types/camelToSnake';

import { CalendarData } from 'components/Calendar/types';

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

export const getBackToModulesUrl = (): string => {
  const {
    location: { pathname },
  } = window;

  return pathname.replace(/\/sessions\/.*/, '/invite');
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

export const getCalendarMetadata = (
  tlfbConfig: CamelToSnake<TlfbConfigBody>,
  calendarData: CalendarData,
) => {
  const {
    data: [
      {
        payload: { days_count: daysCount },
      },
    ],
  } = tlfbConfig;
  const yesterday = dayjs().subtract(1, 'day');
  const oldestFilledDate = getOldestDate(calendarData);
  const datesWithSubstances = pickBy(
    calendarData,
    (date) => !isNil(date.substance),
  );
  const oldestFilledSubstanceDate = getOldestDate(datesWithSubstances);
  const oldestAllowedDate = dayjs().subtract(+daysCount, 'day');
  const isEverySubstanceFilled =
    oldestFilledSubstanceDate?.isSame(oldestAllowedDate, 'day') ?? false;

  return {
    yesterday,
    oldestAllowedDate,
    oldestFilledDate,
    oldestFilledSubstanceDate,
    isEverySubstanceFilled,
  };
};

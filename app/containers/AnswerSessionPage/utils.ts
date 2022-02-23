import dayjs from 'dayjs';

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
  const oldestFilledDate = dayjs.min(
    Object.keys(calendarData).map((dayString) =>
      dayjs(dayString, fullDayToYearFormatter),
    ),
  );
  const oldestAllowedDate = dayjs().subtract(+daysCount, 'day');
  const isEverythingFilled =
    oldestFilledDate?.isSame(oldestAllowedDate, 'day') ?? false;

  return {
    yesterday,
    oldestFilledDate,
    oldestAllowedDate,
    isEverythingFilled,
  };
};

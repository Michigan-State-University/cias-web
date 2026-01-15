import { parseTime24 } from '../../../QuestionListGroup/QuestionGroupSettingsModal/utils';

export const validateTimeRange = (
  from: string | null | undefined,
  to: string | null | undefined,
): boolean => {
  if (!from || !to) return true;

  const fromDate = parseTime24(from);
  const toDate = parseTime24(to);

  if (!fromDate || !toDate) return true;
  return fromDate < toDate;
};

export const calculateMinToTime = (
  from: string | null | undefined,
): Date | undefined => {
  if (!from) return undefined;

  const fromDate = parseTime24(from);
  if (!fromDate) return undefined;

  const minDate = new Date(fromDate);
  minDate.setMinutes(minDate.getMinutes() + 10);
  return minDate;
};

export const getMaxDayTime = (): Date => {
  const max = new Date();
  max.setHours(23, 50, 0, 0);
  return max;
};

export const createDefaultTime = (hours = 13, minutes = 0): Date => {
  const time = new Date();
  time.setHours(hours, minutes, 0, 0);
  return time;
};

export const createDefaultTimeRange = () => ({
  from: createDefaultTime(13, 0),
  to: createDefaultTime(14, 0),
});

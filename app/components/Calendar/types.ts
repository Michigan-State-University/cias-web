import { Dayjs } from 'dayjs';

export type CalendarRef = {
  setMonth: (month: Dayjs) => void;
};

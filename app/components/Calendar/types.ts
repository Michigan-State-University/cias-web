import { Dayjs } from 'dayjs';

export type CalendarRef = {
  setMonth: (month: Dayjs) => void;
};

export type SubstanceUsage = { name: string; consumed: boolean };

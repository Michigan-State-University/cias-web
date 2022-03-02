import { useMemo } from 'react';
import { Dayjs } from 'dayjs';

import { TlfbConfigBody } from 'models/Question';
import { CamelToSnake } from 'global/types/camelToSnake';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { CalendarData } from 'components/Calendar/types';

import { getCalendarMetadata } from './utils';

type Props = {
  calendarData: CalendarData;
  tlfbConfig: CamelToSnake<TlfbConfigBody>;
  isLoading: boolean;
  selectDay: (day: Dayjs) => void;
  selectedDay?: Dayjs;
  changeMonth: (month: Dayjs) => void;
};

export const useDayByDayHandler = ({
  calendarData,
  tlfbConfig,
  isLoading,
  selectDay,
  selectedDay,
  changeMonth,
}: Props) => {
  const { yesterday, oldestFilledSubstanceDate, oldestAllowedDate } = useMemo(
    () => getCalendarMetadata(tlfbConfig, calendarData),
    [tlfbConfig, calendarData],
  );

  useDidUpdateEffect(() => {
    if (isLoading) return;
    if (!oldestFilledSubstanceDate) {
      handleSelectDay(yesterday);
    } else if (oldestFilledSubstanceDate.isAfter(oldestAllowedDate, 'day')) {
      handleSelectDay(oldestFilledSubstanceDate.subtract(1, 'day'));
    }
  }, [isLoading]);

  const goToNextDay = (): void => {
    handleSelectDay(selectedDay!.subtract(1, 'day'));
  };

  const handleSelectDay = (day: Dayjs) => {
    if (day.month() !== selectedDay?.month()) changeMonth(day);

    selectDay(day);
  };

  return { goToNextDay };
};

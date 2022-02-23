import React, { memo } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import arrowGreyLeft from 'assets/svg/arrow-grey-left.svg';
import arrowGreyRight from 'assets/svg/arrow-grey-right.svg';

import { Container, Month, Year, Arrow } from './styled';

type MonthSelectorProps = {
  monthDate: Dayjs;
  onSetMonth: (monthDate: Dayjs) => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  disabled?: boolean;
};

export const MonthSelector = ({
  monthDate,
  onSetMonth,
  canGoNext,
  canGoPrev,
  disabled = false,
}: MonthSelectorProps) => {
  const setNextMonth = () => onSetMonth(monthDate.add(1, 'month'));
  const setPrevMonth = () => onSetMonth(monthDate.subtract(1, 'month'));

  const showArrows = canGoNext || canGoPrev;

  return (
    <Container>
      {showArrows && (
        <Arrow
          src={arrowGreyLeft}
          onClick={setPrevMonth}
          disabled={!canGoPrev || disabled}
          mr={15}
        />
      )}
      <Month>
        {dayjs.months()[monthDate.month()]}
        ,&nbsp;
      </Month>
      <Year>{monthDate.year()}</Year>
      {showArrows && (
        <Arrow
          src={arrowGreyRight}
          onClick={setNextMonth}
          disabled={!canGoNext || disabled}
          ml={15}
        />
      )}
    </Container>
  );
};

export default memo(MonthSelector);

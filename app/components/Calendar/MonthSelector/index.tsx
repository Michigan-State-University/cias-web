import React, { memo } from 'react';
import { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';

import arrowGreyLeft from 'assets/svg/arrow-grey-left.svg';
import arrowGreyRight from 'assets/svg/arrow-grey-right.svg';

import { capitalizeFirstLetter } from 'utils/text';

import { makeSelectLocale } from 'containers/AppLanguageProvider';

import { Container, Month, Year, Arrow } from './styled';
import { MONTH_SELECTOR_ID } from '../constants';

type MonthSelectorProps = {
  monthDate: Dayjs;
  onSetMonth: (monthDate: Dayjs) => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  disabled?: boolean;
  language?: string;
};

export const MonthSelector = ({
  monthDate,
  onSetMonth,
  canGoNext,
  canGoPrev,
  disabled = false,
  language,
}: MonthSelectorProps) => {
  const setNextMonth = () => onSetMonth(monthDate.add(1, 'month'));
  const setPrevMonth = () => onSetMonth(monthDate.subtract(1, 'month'));

  const appLocale = useSelector(makeSelectLocale());

  const showArrows = canGoNext || canGoPrev;

  return (
    <Container id={MONTH_SELECTOR_ID}>
      {showArrows && (
        <Arrow
          src={arrowGreyLeft}
          onClick={setPrevMonth}
          disabled={!canGoPrev || disabled}
          mr={15}
        />
      )}
      <Month>
        {capitalizeFirstLetter(
          monthDate.locale(language || appLocale).format('MMMM'),
        )}
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

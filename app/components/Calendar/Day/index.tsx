import React, { memo, useRef } from 'react';
import { Dayjs } from 'dayjs';

import {
  fullDayToYearFormatter,
  firstDayOfMonthFormatter,
} from 'utils/formatters';

import { Container, DayNo, Wrapper } from './styled';

type CalendarDayType = {
  disabled?: boolean;
  unreachable?: boolean;
  day: Dayjs;
  onClick?: (id: string) => void;
  active?: boolean;
  mobile?: boolean;
};

export const Day = ({
  day,
  onClick,
  mobile = false,
  disabled = false,
  unreachable = false,
  active = false,
}: CalendarDayType) => {
  const ref = useRef<HTMLElement>();
  const date = day.date();
  const id = day.format(fullDayToYearFormatter);

  const handleClick = () => (!disabled && onClick ? onClick(id) : undefined);

  const dayNo = date === 1 ? day.format(firstDayOfMonthFormatter) : date;

  return (
    <Wrapper>
      <Container
        ref={ref}
        id={id}
        disabled={disabled}
        active={active}
        unreachable={unreachable}
        onClick={handleClick}
        mobile={mobile}
      >
        <DayNo>{dayNo}</DayNo>
      </Container>
    </Wrapper>
  );
};

export default memo(Day);

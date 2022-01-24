import React, { memo, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { fullDayToYearFormatter } from 'utils/formatters';

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
  const date = dayjs(day).date();
  const id = dayjs(day).format(fullDayToYearFormatter);

  const handleClick = () => (!disabled && onClick ? onClick(id) : undefined);

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
        <DayNo>{date}</DayNo>
      </Container>
    </Wrapper>
  );
};

export default memo(Day);

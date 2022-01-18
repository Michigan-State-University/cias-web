import React from 'react';

import { Container, DayNo } from './styled';

type CalendarDayType = {
  disabled?: boolean;
  unreachable?: boolean;
  day: number;
  onClick?: () => void;
  active?: boolean;
};

export const Day = ({
  day,
  onClick,
  disabled = false,
  unreachable = false,
  active = false,
}: CalendarDayType) => (
  <Container
    disabled={disabled}
    active={active}
    unreachable={unreachable}
    onClick={!disabled ? onClick : () => {}}
  >
    <DayNo>{day}</DayNo>
  </Container>
);

export default Day;

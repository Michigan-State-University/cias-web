import React from 'react';

import { Container, DayNo } from './styled';

type CalendarDayType = {
  disabled?: boolean;
  unreachable?: boolean;
  day: number;
  onClick?: () => void;
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
}: CalendarDayType) => (
  <Container
    disabled={disabled}
    active={active}
    unreachable={unreachable}
    onClick={!disabled ? onClick : () => {}}
    mobile={mobile}
  >
    <DayNo>{day}</DayNo>
  </Container>
);

export default Day;

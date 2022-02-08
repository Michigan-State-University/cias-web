import React, { memo, useRef } from 'react';
import { Dayjs } from 'dayjs';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import Box from 'components/Box';
import Text from 'components/Text';
import { EventData } from 'models/Tlfb';
import {
  fullDayToYearFormatter,
  firstDayOfMonthFormatter,
} from 'utils/formatters';

import { colors } from 'theme';
import messages from '../messages';
import { Container, DayNo, Wrapper, Dot } from './styled';

type CalendarDayType = {
  disabled?: boolean;
  unreachable?: boolean;
  day: Dayjs;
  onClick?: (id: string) => void;
  active?: boolean;
  mobile?: boolean;
  events?: EventData[];
};

export const Day = ({
  day,
  onClick,
  mobile = false,
  disabled = false,
  unreachable = false,
  active = false,
  events = [],
}: CalendarDayType) => {
  const { formatMessage } = useIntl();
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
        hasEvents={!isEmpty(events)}
      >
        <DayNo>{dayNo}</DayNo>
        <Box>
          {!mobile &&
            events.map((event) => (
              <Box display="flex" align="center" mt={8}>
                <Dot />
                <Text
                  ml={4}
                  textOpacity={0.7}
                  fontSize={11}
                  lineHeight="11px"
                  color={colors.bluewood}
                >
                  {event.name || formatMessage(messages.event)}
                </Text>
              </Box>
            ))}
        </Box>
      </Container>
    </Wrapper>
  );
};

export default memo(Day);

import React, { memo, useRef } from 'react';
import { Dayjs } from 'dayjs';
import { useIntl, FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import Box from 'components/Box';
import { EventData } from 'models/Tlfb';
import {
  fullDayToYearFormatter,
  firstDayOfMonthFormatter,
} from 'utils/formatters';

import messages from '../messages';
import { Container, DayNo, Wrapper, Dot, StyledText } from './styled';
import { getNumberOfEventsVisible } from '../utils';

type CalendarDayType = {
  disabled?: boolean;
  unreachable?: boolean;
  day: Dayjs;
  onClick?: (id: string) => void;
  active?: boolean;
  mobile?: boolean;
  events?: EventData[];
  rowsNumber: number;
};

export const Day = ({
  day,
  onClick,
  rowsNumber,
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

  const numberOfEventsVisible = getNumberOfEventsVisible(rowsNumber);
  const numberOfEventsHidden = events.length - numberOfEventsVisible;

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
        {!mobile && (
          <Box>
            {events.slice(0, numberOfEventsVisible).map((event) => (
              <Box display="flex" align="center" mt={8}>
                <Dot />
                <StyledText ml={4}>
                  {event.name || formatMessage(messages.defaultEventName)}
                </StyledText>
              </Box>
            ))}
            {numberOfEventsHidden > 0 && (
              <StyledText mt={8}>
                <FormattedMessage
                  values={{ count: numberOfEventsHidden }}
                  {...messages.moreEvents}
                />
              </StyledText>
            )}
          </Box>
        )}
      </Container>
    </Wrapper>
  );
};

export default memo(Day);

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Dayjs } from 'dayjs';

import { EventData } from 'models/Tlfb';

import { firstDayOfMonthFormatter } from 'utils/formatters';

import { colors } from 'theme';
import Box from 'components/Box';

import messages from '../messages';
import { Container, DayNo, Dot, StyledText, Wrapper } from './styled';
import { EventList } from './EventList';
import SubstancesCounter from './SubstancesCounter';

export type DayCellProps = {
  day: Dayjs;
  events: EventData[];
  id: string;
  unreachable?: boolean;
  disabled?: boolean;
  active?: boolean;
  compact?: boolean;
  onClick?: (day: Dayjs, id: string) => void;
  numberOfEventsVisible: number;
  numberOfEventsHidden: number;
  disableManualDayClick?: boolean;
  substanceCount?: number | boolean;
};

const DayCellComponent = ({
  day,
  events,
  id,
  unreachable = false,
  disabled = false,
  active,
  compact,
  onClick,
  numberOfEventsVisible,
  numberOfEventsHidden,
  disableManualDayClick,
  substanceCount,
}: DayCellProps) => {
  const date = day.date();
  const dayNo = date === 1 ? day.format(firstDayOfMonthFormatter) : date;

  const handleClick = () =>
    !disabled && !disableManualDayClick && onClick
      ? onClick(day, id)
      : undefined;

  return (
    <Wrapper>
      <Container
        id={id}
        disabled={disabled}
        active={active}
        unreachable={unreachable}
        onClick={handleClick}
        compact={compact}
        hasEvents={!isEmpty(events)}
        $notClickable={disableManualDayClick}
      >
        <Box
          width="100%"
          display="flex"
          justify={!compact ? 'between' : 'center'}
          position="relative"
        >
          <DayNo>{dayNo}</DayNo>
          {!isNil(substanceCount) && (
            <>
              {compact && (
                <Box mt={2} position="absolute" top={15}>
                  <Dot red={!!substanceCount} />
                </Box>
              )}
              {!compact && (
                <Box ml={5} overflow="hidden">
                  <SubstancesCounter substanceCount={substanceCount} />
                </Box>
              )}
            </>
          )}
        </Box>
        {!compact && (
          <Box>
            <EventList
              events={events.slice(0, numberOfEventsVisible)}
              textColor={colors.bluewood}
            />
            {numberOfEventsHidden > 0 && (
              <StyledText color={colors.bluewood} mt={8}>
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

export const DayCell = memo(DayCellComponent);

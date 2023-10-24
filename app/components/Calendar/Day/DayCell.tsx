import React, { memo, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Dayjs } from 'dayjs';

import { DayData, EventData } from 'models/Tlfb';

import { colors } from 'theme';
import Box from 'components/Box';

import messages from '../messages';
import { Container, DayNo, Dot, StyledText, Wrapper } from './styled';
import EventList from './EventList';

export type DayCellProps = {
  day: Dayjs;
  id: string;
  unreachable?: boolean;
  disabled?: boolean;
  active?: boolean;
  compact?: boolean;
  onClick?: (day: Dayjs, id: string) => void;
  numberOfEventsHidden: number;
  disableManualDayClick?: boolean;
  substancesLabel: Nullable<ReactNode>;
  dayData?: DayData;
};

const DayCellComponent = ({
  day,
  id,
  unreachable = false,
  disabled = false,
  active,
  compact,
  onClick,
  numberOfEventsHidden,
  disableManualDayClick,
  substancesLabel,
  dayData,
}: DayCellProps) => {
  const date = day.date();
  const events: EventData[] = dayData?.events || [];
  const substancesConsumed = dayData?.answer?.body?.substancesConsumed;

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
          gap={5}
        >
          <DayNo>{date}</DayNo>
          {!isNil(substancesLabel) && (
            <>
              {compact && (
                <Box mt={2} position="absolute" top={15}>
                  <Dot blue={substancesConsumed} />
                </Box>
              )}
              {!compact && (
                <Box overflow="hidden" dir="auto">
                  {substancesLabel}
                </Box>
              )}
            </>
          )}
        </Box>
        {!compact && (
          <Box display="flex" align="center" width="100%" dir="auto" gap={12}>
            <EventList
              events={events.slice(0, 1)}
              textColor={colors.bluewood}
            />
            {numberOfEventsHidden > 0 && (
              <StyledText color={colors.bluewood} dir="auto">
                <FormattedMessage
                  values={{ count: numberOfEventsHidden }}
                  {...messages.moreToDisplay}
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

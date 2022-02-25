import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import { fullDayToYearFormatter } from 'utils/formatters';

import Box from 'components/Box';
import Tooltip from 'components/Tooltip';
import Text from 'components/Text';

import messages from '../messages';
import { getNumberOfEventsVisible } from '../utils';
import { EventList } from './EventList';
import { DayCell, DayCellProps } from './DayCell';

export type CalendarDayType = {
  rowsNumber: number;
} & Pick<
  DayCellProps,
  | 'day'
  | 'events'
  | 'unreachable'
  | 'disabled'
  | 'active'
  | 'onClick'
  | 'compact'
  | 'disableManualDayClick'
>;

export const Day = ({
  day,
  rowsNumber,
  compact,
  active,
  events = [],
  ...props
}: CalendarDayType) => {
  const { formatMessage } = useIntl();
  const id = day.format(fullDayToYearFormatter);

  const numberOfEventsVisible = getNumberOfEventsVisible(rowsNumber);
  const numberOfEventsHidden = events.length - numberOfEventsVisible;
  const shouldRenderTooltip = !compact && !active && numberOfEventsHidden > 0;

  const dayContentProps: DayCellProps = {
    day,
    events,
    id,
    compact,
    active,
    numberOfEventsVisible,
    numberOfEventsHidden,
    ...props,
  };

  if (!shouldRenderTooltip) return <DayCell {...dayContentProps} />;

  return (
    // @ts-ignore
    <Tooltip
      id={`${id}-events-tooltip`}
      place="right"
      stretchContent
      backgroundColor={colors.bluewood}
      content={
        <Box>
          <Text color={colors.white} fontSize={12} fontWeight="bold" mb={4}>
            {formatMessage(messages.events)}
          </Text>
          <EventList events={events} textColor={colors.white} wrap />
        </Box>
      }
    >
      <DayCell {...dayContentProps} />
    </Tooltip>
  );
};

export default memo(Day);

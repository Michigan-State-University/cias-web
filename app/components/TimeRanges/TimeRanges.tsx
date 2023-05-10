import React from 'react';
import isEqual from 'lodash/isEqual';
import remove from 'lodash/remove';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { TimeRange } from 'models/TimeRange';

import Checkbox from 'components/Checkbox';
import Column from 'components/Column';
import Text from 'components/Text';

import messages from './messages';

export type Props = {
  availableTimeRanges: TimeRange[];
  selectedTimeRanges?: TimeRange[];
  disabled?: boolean;
  onChange?: (newTimeRanges: TimeRange[]) => void;
};

export const TimeRanges: React.FC<Props> = ({
  availableTimeRanges,
  selectedTimeRanges = [],
  disabled,
  onChange,
}: Props) => {
  const { formatMessage } = useIntl();

  const handleChange = (selected: boolean, alteredTimeRange: TimeRange) => {
    const newSelectedTimeRanges = [...selectedTimeRanges];
    if (selected) {
      newSelectedTimeRanges.push(alteredTimeRange);
    } else {
      remove(newSelectedTimeRanges, (timeRange) =>
        isEqual(timeRange, alteredTimeRange),
      );
    }
    if (onChange) {
      onChange(newSelectedTimeRanges);
    }
  };

  const formatTime = (hour: string | number) =>
    // @ts-ignore
    +hour === 12 ? formatMessage(messages.noon) : dayjs({ hour }).format('LT');

  return (
    <Column gap={16}>
      <Text>{formatMessage(messages.timeRangesTitle)}</Text>
      {availableTimeRanges.map((timeRange) => {
        const { from, to, label } = timeRange;
        const key = `time-range-${from}-${to}`;
        const checked = selectedTimeRanges.some((selectedTimeRange) =>
          isEqual(selectedTimeRange, timeRange),
        );
        return (
          <Checkbox
            key={key}
            id={key}
            checked={checked}
            onChange={(selected) => handleChange(selected, timeRange)}
            disabled={disabled}
          >
            {formatMessage(messages.timeRangeOption, {
              label,
              from: formatTime(from),
              to: formatTime(to),
            })}
          </Checkbox>
        );
      })}
    </Column>
  );
};

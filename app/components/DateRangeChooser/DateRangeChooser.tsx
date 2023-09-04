import React, { ComponentProps, useMemo } from 'react';
import { useIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Text from 'components/Text';

import messages from './messages';

export type Props = {
  disabled: boolean;
  onDateRangeUpdate: (
    startDate: Nullable<Date>,
    endDate: Nullable<Date>,
  ) => void;
  startDate?: string;
  endDate?: string;
  startDateLabel?: string;
  endDateLabel?: string;
  labelsStyles?: Partial<ComponentProps<typeof Text>>;
  inputsStyles?: Partial<ComponentProps<typeof ApprovableInput>['styles']>;
};

export const DateRangeChooser = ({
  disabled,
  onDateRangeUpdate,
  startDate: startDateString,
  endDate: endDateString,
  startDateLabel,
  endDateLabel,
  labelsStyles,
  inputsStyles,
}: Props) => {
  const { formatMessage } = useIntl();

  const startDate = useMemo(
    () => (startDateString ? new Date(startDateString) : null),
    [startDateString],
  );

  const endDate = useMemo(
    () => (endDateString ? new Date(endDateString) : null),
    [endDateString],
  );

  const updateStartDate = (newStartDate: Date) => {
    onDateRangeUpdate(newStartDate, endDate);
  };

  const updateEndDate = (newEndDate: Date) => {
    onDateRangeUpdate(startDate, newEndDate);
  };

  const { width, ...restInputStyles } = inputsStyles ?? {};

  return (
    <Box display="flex" gap={12}>
      <Box maxWidth={width} flex={1}>
        <Text mb={8} {...labelsStyles}>
          {startDateLabel ?? formatMessage(messages.dateFrom)}
        </Text>
        <ApprovableInput
          disabled={disabled}
          height={50}
          type="date"
          value={startDate}
          onCheck={updateStartDate}
          fontSize={15}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          width="100%"
          styles={restInputStyles}
        />
      </Box>
      <Box maxWidth={width} flex={1}>
        <Text mb={8} {...labelsStyles}>
          {endDateLabel ?? formatMessage(messages.dateTo)}
        </Text>
        <ApprovableInput
          disabled={disabled}
          height={50}
          type="date"
          value={endDate}
          onCheck={updateEndDate}
          fontSize={15}
          minDate={startDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          width="100%"
          styles={restInputStyles}
        />
      </Box>
    </Box>
  );
};

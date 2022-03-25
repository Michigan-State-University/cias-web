import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Text from 'components/Text';

import messages from './messages';

type Props = {
  disabled: boolean;
  onDateRangeUpdate: (
    startDate: Nullable<Date>,
    endDate: Nullable<Date>,
  ) => void;
  startDate?: string;
  endDate?: string;
};

const DateRangeChooser = ({
  disabled,
  onDateRangeUpdate,
  startDate: startDateString,
  endDate: endDateString,
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

  const inputStyles = { bg: 'white', textOpacity: 1 };
  return (
    <Box display="flex">
      <Box width={150} mr={12}>
        <Text ml={10} mb={8}>
          {formatMessage(messages.dateFrom)}
        </Text>
        <ApprovableInput
          disabled={disabled}
          width={150}
          height={50}
          placeholder={formatMessage(messages.selectDate)}
          type="date"
          value={startDate}
          onCheck={updateStartDate}
          fontSize={15}
          maxDate={endDate}
          styles={inputStyles}
        />
      </Box>
      <Box width={150}>
        <Text ml={10} mb={8}>
          {formatMessage(messages.dateTo)}
        </Text>
        <ApprovableInput
          disabled={disabled}
          width={150}
          height={50}
          placeholder={formatMessage(messages.selectDate)}
          type="date"
          value={endDate}
          onCheck={updateEndDate}
          fontSize={15}
          minDate={startDate}
          styles={inputStyles}
        />
      </Box>
    </Box>
  );
};

export default DateRangeChooser;

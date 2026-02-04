import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { ModalContentRendererProps } from 'components/Modal';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import { Button } from 'components/Button';
import { LocalizedDatePicker } from 'components/DatePicker';
import { DateInput } from 'components/Input/DateInput';
import Select from 'components/Select';
import { TIMEZONES } from 'utils/timezones';
import { getTimezoneLabel } from 'components/FormikTimezoneSelect';

import { ExportModalState } from './types';
import { ExportedFilePanel } from './ExportedFilePanel';
import { ExportConfirmationPanel } from './ExportConfirmationPanel ';
import messages from './messages';

export const ExportModalContent = ({
  modalState: {
    description,
    fileGeneratedDescription,
    generateButtonTitle,
    file,
    onExport,
    exportLoaderSelector,
    showDateTimeFilters = false,
  },
  closeModal,
}: ModalContentRendererProps<ExportModalState>) => {
  const { formatMessage } = useIntl();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState<{
    value: string;
    label: string;
  } | null>({
    value: 'America/New_York',
    label: getTimezoneLabel('America/New_York'),
  });

  const timezoneOptions = useMemo(
    () =>
      TIMEZONES.map((tz) => ({
        value: tz,
        label: getTimezoneLabel(tz),
      })),
    [],
  );

  const handleExport = () =>
    onExport(
      () => setShowConfirmation(true),
      startDate,
      endDate,
      timezone?.value,
    );

  const loading = useSelector(exportLoaderSelector) as boolean;

  return (
    <Column gap={20} align="center" justify="center" flex={1} px={20}>
      {!showConfirmation && (
        <>
          <Text fontSize={15} lineHeight={1.35} textAlign="center">
            {file ? fileGeneratedDescription : description}
          </Text>

          <ExportedFilePanel file={file} />

          {showDateTimeFilters && (
            <Column width="100%" gap={15}>
              <Row width="100%" gap={15}>
                <Column width="100%">
                  <Text mb={8} fontWeight="bold" fontSize={13}>
                    {formatMessage(messages.startDateLabel)}
                  </Text>
                  <LocalizedDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="MM/dd/yyyy, h:mm aa"
                    placeholderText={formatMessage(
                      messages.startDatePlaceholder,
                    )}
                    customInput={<DateInput width="100%" height={45} />}
                    maxDate={endDate || undefined}
                    isClearable
                  />
                </Column>

                <Column width="100%">
                  <Text mb={8} fontWeight="bold" fontSize={13}>
                    {formatMessage(messages.endDateLabel)}
                  </Text>
                  <LocalizedDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="MM/dd/yyyy, h:mm aa"
                    placeholderText={formatMessage(messages.endDatePlaceholder)}
                    customInput={<DateInput width="100%" height={45} />}
                    minDate={startDate || undefined}
                    isClearable
                  />
                </Column>
              </Row>

              <Column width="100%">
                <Text mb={8} fontWeight="bold" fontSize={13}>
                  {formatMessage(messages.timezoneLabel)}
                </Text>
                <Select
                  {...({
                    selectProps: {
                      value: timezone,
                      onChange: (
                        selected: { value: string; label: string } | null,
                      ) => setTimezone(selected),
                      options: timezoneOptions,
                      placeholder: formatMessage(messages.timezoneLabel),
                      isSearchable: true,
                    },
                  } as any)}
                />
              </Column>
            </Column>
          )}

          <Button
            width="auto"
            px={32}
            onClick={handleExport}
            loading={loading}
            mt={10}
          >
            {generateButtonTitle}
          </Button>
        </>
      )}
      {showConfirmation && <ExportConfirmationPanel onClose={closeModal} />}
    </Column>
  );
};

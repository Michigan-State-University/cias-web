import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import values from 'lodash/values';

import { SmsSendTimeType, SmsSendTimeDetails } from 'models/TextMessage';

import Selector from 'components/Selector';
import Row from 'components/Row';
import Column from 'components/Column';
import Text from 'components/Text';
import { DateInput } from 'components/Input/DateInput';
import { LocalizedDatePicker } from 'components/DatePicker';

import {
  parseTime24,
  getTimeString24,
} from '../../../QuestionListGroup/QuestionGroupSettingsModal/utils';

import messages from './messages';

export type Props = {
  smsSendTimeType: SmsSendTimeType;
  smsSendTimeDetails: Nullable<SmsSendTimeDetails>;
  onSmsSendTimeTypeChange: (newType: SmsSendTimeType) => void;
  onSmsSendTimeDetailsChange: (details: SmsSendTimeDetails) => void;
  disabled: boolean;
};

const SmsSendTimeSettingsComponent = ({
  smsSendTimeType,
  smsSendTimeDetails,
  onSmsSendTimeTypeChange,
  onSmsSendTimeDetailsChange,
  disabled,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const ALL_TIME_TYPES = useMemo(
    () => ({
      [SmsSendTimeType.PREFERRED_BY_PARTICIPANT]: {
        id: SmsSendTimeType.PREFERRED_BY_PARTICIPANT,
        label: formatMessage(messages.preferredByParticipant),
      },
      [SmsSendTimeType.SPECIFIC_TIME]: {
        id: SmsSendTimeType.SPECIFIC_TIME,
        label: formatMessage(messages.exactTimeByResearcher),
      },
      [SmsSendTimeType.TIME_RANGE]: {
        id: SmsSendTimeType.TIME_RANGE,
        label: formatMessage(messages.timeRangeByResearcher),
      },
    }),
    [formatMessage],
  );

  const handleSelectChange = (optionId: SmsSendTimeType) => {
    onSmsSendTimeTypeChange(optionId);

    if (
      optionId === SmsSendTimeType.SPECIFIC_TIME &&
      !smsSendTimeDetails?.time
    ) {
      const defaultTime = new Date();
      defaultTime.setHours(13, 0, 0, 0);
      onSmsSendTimeDetailsChange({ time: getTimeString24(defaultTime) });
    } else if (
      optionId === SmsSendTimeType.TIME_RANGE &&
      (!smsSendTimeDetails?.from || !smsSendTimeDetails?.to)
    ) {
      const defaultFrom = new Date();
      defaultFrom.setHours(13, 0, 0, 0);
      const defaultTo = new Date();
      defaultTo.setHours(14, 0, 0, 0);
      onSmsSendTimeDetailsChange({
        from: getTimeString24(defaultFrom),
        to: getTimeString24(defaultTo),
      });
    }
  };

  const handleTimeChange = (date: Date | null) => {
    if (date) {
      onSmsSendTimeDetailsChange({ time: getTimeString24(date) });
    }
  };

  const handleFromChange = (date: Date | null) => {
    if (date) {
      onSmsSendTimeDetailsChange({
        ...smsSendTimeDetails,
        from: getTimeString24(date),
      });
    }
  };

  const handleToChange = (date: Date | null) => {
    if (date) {
      onSmsSendTimeDetailsChange({
        ...smsSendTimeDetails,
        to: getTimeString24(date),
      });
    }
  };

  return (
    <>
      <Row width="100%" align="center" height="100%" mt={10}>
        <Text fontWeight="bold" mr={5} fontSize={15}>
          {formatMessage(messages.timeOfTheMessage)}
        </Text>
        <Selector
          options={values(ALL_TIME_TYPES)}
          setOption={handleSelectChange}
          activeOption={ALL_TIME_TYPES[smsSendTimeType]}
          disabled={disabled}
        />
      </Row>

      {smsSendTimeType === SmsSendTimeType.SPECIFIC_TIME && (
        <Row mt={10}>
          <Column width="100%">
            <label htmlFor="exact_time">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.exactTime)}
              </Text>
            </label>
            <LocalizedDatePicker
              id="exact_time"
              selected={parseTime24(smsSendTimeDetails?.time || '')}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeFormat="HH:mm"
              calendarClassName="schedule-date-picker"
              customInput={<DateInput id="exact_time_picker" width="100%" />}
              timeCaption={formatMessage(messages.time)}
              dateFormat="HH:mm"
              disabled={disabled}
            />
          </Column>
        </Row>
      )}

      {smsSendTimeType === SmsSendTimeType.TIME_RANGE && (
        <Row mt={10} gap={8}>
          <Column>
            <label htmlFor="time_range_from">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.from)}
              </Text>
            </label>
            <LocalizedDatePicker
              id="time_range_from"
              selected={parseTime24(smsSendTimeDetails?.from || '')}
              onChange={handleFromChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeFormat="HH:mm"
              calendarClassName="schedule-date-picker"
              customInput={
                <DateInput id="time_range_from_picker" width="100%" />
              }
              timeCaption={formatMessage(messages.time)}
              dateFormat="HH:mm"
              disabled={disabled}
            />
          </Column>
          <Column>
            <label htmlFor="time_range_to">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.to)}
              </Text>
            </label>
            <LocalizedDatePicker
              id="time_range_to"
              selected={parseTime24(smsSendTimeDetails?.to || '')}
              onChange={handleToChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeFormat="HH:mm"
              calendarClassName="schedule-date-picker"
              customInput={<DateInput id="time_range_to_picker" width="100%" />}
              timeCaption={formatMessage(messages.time)}
              dateFormat="HH:mm"
              disabled={disabled}
            />
          </Column>
        </Row>
      )}
    </>
  );
};

export const SmsSendTimeSettings = memo(SmsSendTimeSettingsComponent);

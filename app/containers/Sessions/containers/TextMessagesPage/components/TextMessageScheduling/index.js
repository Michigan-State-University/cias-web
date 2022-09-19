import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Col as GCol, Row as GRow } from 'react-grid-system';
import dayjs from 'dayjs';

import {
  TextMessageScheduleFrequency,
  TextMessageScheduleOption,
} from 'models/TextMessage';

import Selector from 'components/Selector';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import ApprovableInput from 'components/Input/ApprovableInput';

import { numericValidator } from 'utils/validators';
import { themeColors } from 'theme';

import messages from './messages';
import { StyledInputWrapper } from './styled';
const TextMessageScheduling = ({
  id,
  selectedOption,
  value,
  frequency,
  endAt,
  formatMessage,
  onChangeOption,
  onChangeValue,
  onChangeFrequency,
  disabled,
}) => {
  const [frequencySettings, setFrequencySettings] = useState({
    frequency,
    endAt,
  });

  useEffect(() => {
    setFrequencySettings({ frequency, endAt });
  }, [id]);

  const handleChangeFrequencySettings = (updatedSettings) => {
    if (
      updatedSettings.frequency === TextMessageScheduleFrequency.ONCE ||
      (updatedSettings.frequency && updatedSettings.endAt)
    ) {
      onChangeFrequency(updatedSettings);
    }
  };

  const handleChangeFrequency = (frequencyValue) => {
    const updatedSettings = {
      ...frequencySettings,
      frequency: frequencyValue,
    };
    setFrequencySettings(updatedSettings);
    handleChangeFrequencySettings(updatedSettings);
  };
  const handleChangeEndAt = (dateValue) => {
    const updatedSettings = {
      ...frequencySettings,
      endAt: dateValue.toLocaleString('en-GB'),
    };
    setFrequencySettings(updatedSettings);
    handleChangeFrequencySettings(updatedSettings);
  };

  const disableDatePicker =
    frequencySettings.frequency === TextMessageScheduleFrequency.ONCE;

  const ALL_SCHEDULE_OPTIONS = {
    [TextMessageScheduleOption.AFTER_FILL]: {
      id: TextMessageScheduleOption.AFTER_FILL,
      label: formatMessage(messages[TextMessageScheduleOption.AFTER_FILL]),
    },
    [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
      id: TextMessageScheduleOption.DAYS_AFTER_FILL,
      label: formatMessage(messages[TextMessageScheduleOption.DAYS_AFTER_FILL]),
    },
  };

  const ALL_FREQUENCIES = {
    [TextMessageScheduleFrequency.ONCE]: {
      id: TextMessageScheduleFrequency.ONCE,
      label: formatMessage(messages[TextMessageScheduleFrequency.ONCE]),
    },
    [TextMessageScheduleFrequency.ONCE_DAY]: {
      id: TextMessageScheduleFrequency.ONCE_DAY,
      label: formatMessage(messages[TextMessageScheduleFrequency.ONCE_DAY]),
    },
    [TextMessageScheduleFrequency.ONCE_WEEK]: {
      id: TextMessageScheduleFrequency.ONCE_WEEK,
      label: formatMessage(messages[TextMessageScheduleFrequency.ONCE_WEEK]),
    },
    [TextMessageScheduleFrequency.ONCE_MONTH]: {
      id: TextMessageScheduleFrequency.ONCE_MONTH,
      label: formatMessage(messages[TextMessageScheduleFrequency.ONCE_MONTH]),
    },
  };
  return (
    <Column>
      <Row mt={32}>
        <Selector
          options={values(ALL_SCHEDULE_OPTIONS)}
          rightPosition="315"
          setOption={onChangeOption}
          activeOption={ALL_SCHEDULE_OPTIONS[selectedOption]}
          disabled={disabled}
        />
      </Row>
      {selectedOption === TextMessageScheduleOption.DAYS_AFTER_FILL && (
        <Row mt={10} align="center">
          <Text fontSize={15}>{formatMessage(messages.send)}</Text>
          <StyledInputWrapper>
            <ApprovableInput
              type="singleline"
              placeholder={formatMessage(messages.number)}
              validator={numericValidator}
              height={50}
              mr={0}
              value={value ?? ''}
              onCheck={onChangeValue}
              fontSize={15}
              padding={5}
              textAlign="center"
              disabled={disabled}
            />
          </StyledInputWrapper>
          <Text fontSize={15}>{formatMessage(messages.sendDays)}</Text>
        </Row>
      )}
      <GRow style={{ width: '100%' }}>
        <GCol xl={12} xxl={6}>
          <Row width="100%" align="center" height="100%" mt={10}>
            <Text fontWeight="bold" mr={5} fontSize={15}>
              {formatMessage(messages.frequency)}
            </Text>
            <Selector
              options={values(ALL_FREQUENCIES)}
              rightPosition="315"
              setOption={handleChangeFrequency}
              activeOption={ALL_FREQUENCIES[frequencySettings.frequency]}
              disabled={disabled}
            />
          </Row>
        </GCol>
        <GCol>
          <Row
            disabled={disabled || disableDatePicker}
            width="100%"
            align="center"
            mt={20}
          >
            <Text minWidth={70} fontWeight="bold" mr={5} fontSize={15}>
              {formatMessage(messages.finishBy)}
            </Text>
            <Row>
              <Column justify="center" align="center" height="100%" pt={15}>
                <ApprovableInput
                  type="date"
                  placeholder={formatMessage(messages.date)}
                  validator={numericValidator}
                  height={50}
                  mr={0}
                  value={
                    frequencySettings.endAt
                      ? dayjs(frequencySettings.endAt, 'DD/MM/YYYY').toDate()
                      : ''
                  }
                  onCheck={handleChangeEndAt}
                  fontSize={15}
                  padding={5}
                  textAlign="center"
                  width={120}
                  minDate={new Date()}
                  disabled={disabled || disableDatePicker}
                />
                <Row minHeight={16} mt={5}>
                  {!disableDatePicker && !frequencySettings.endAt && (
                    <Text color={themeColors.warning}>
                      {formatMessage(messages.provideDate)}
                    </Text>
                  )}
                </Row>
              </Column>
            </Row>
          </Row>
        </GCol>
      </GRow>
    </Column>
  );
};

TextMessageScheduling.propTypes = {
  selectedOption: PropTypes.string,
  id: PropTypes.string,
  endAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  frequency: PropTypes.string,
  formatMessage: PropTypes.func,
  onChangeOption: PropTypes.func,
  onChangeFrequency: PropTypes.func,
  onChangeValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextMessageScheduling;

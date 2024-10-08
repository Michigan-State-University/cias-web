import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Col as GCol, Row as GRow } from 'react-grid-system';
import { Markup } from 'interweave';

import dayjs from 'dayjs';

import {
  TextMessageScheduleFrequency,
  TextMessageScheduleOption,
} from 'models/TextMessage';
import Selector from 'components/Selector';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import Badge from 'components/Badge';

import ApprovableInput from 'components/Input/ApprovableInput';
import { numericValidator } from 'utils/validators';

import { colors, themeColors } from 'theme';
import { dateQuestion } from 'models/Session/QuestionTypes';
import { SessionTypes } from 'models/Session';
import messages from './messages';
import { StyledInputWrapper } from './styled';
import textMessageScheduleOptionsMessages from './textMessageScheduleOptionsMessages';
import textMessageScheduleFrequenciesMessages from './textMessageScheduleFrequenciesMessages';
import VariableChooser from '../../../../../VariableChooser';

const TextMessageScheduling = ({
  id,
  selectedOption,
  value,
  variableValue,
  frequency,
  endAt,
  formatMessage,
  onChangeOption,
  onChangeValue,
  onChangeVariable,
  onChangeFrequency,
  disabled,
  sessionId,
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
      label: formatMessage(
        textMessageScheduleOptionsMessages[
          TextMessageScheduleOption.AFTER_FILL
        ],
      ),
    },
    [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
      id: TextMessageScheduleOption.DAYS_AFTER_FILL,
      label: formatMessage(
        textMessageScheduleOptionsMessages[
          TextMessageScheduleOption.DAYS_AFTER_FILL
        ],
      ),
    },
    [TextMessageScheduleOption.DAYS_AFTER_USER_DEFINED_TIME]: {
      id: TextMessageScheduleOption.DAYS_AFTER_USER_DEFINED_TIME,
      label: formatMessage(
        textMessageScheduleOptionsMessages[
          TextMessageScheduleOption.DAYS_AFTER_USER_DEFINED_TIME
        ],
      ),
    },
  };

  const ALL_FREQUENCIES = {
    [TextMessageScheduleFrequency.ONCE]: {
      id: TextMessageScheduleFrequency.ONCE,
      label: formatMessage(
        textMessageScheduleFrequenciesMessages[
          TextMessageScheduleFrequency.ONCE
        ],
      ),
    },
    [TextMessageScheduleFrequency.ONCE_DAY]: {
      id: TextMessageScheduleFrequency.ONCE_DAY,
      label: formatMessage(
        textMessageScheduleFrequenciesMessages[
          TextMessageScheduleFrequency.ONCE_DAY
        ],
      ),
    },
    [TextMessageScheduleFrequency.ONCE_WEEK]: {
      id: TextMessageScheduleFrequency.ONCE_WEEK,
      label: formatMessage(
        textMessageScheduleFrequenciesMessages[
          TextMessageScheduleFrequency.ONCE_WEEK
        ],
      ),
    },
    [TextMessageScheduleFrequency.ONCE_MONTH]: {
      id: TextMessageScheduleFrequency.ONCE_MONTH,
      label: formatMessage(
        textMessageScheduleFrequenciesMessages[
          TextMessageScheduleFrequency.ONCE_MONTH
        ],
      ),
    },
  };
  return (
    <Column>
      <Row>
        <Markup
          content={formatMessage(messages.stopFeatureInfo)}
          attributes={{ opacity: 0.7 }}
          tagName={Text}
        />
      </Row>
      <Row mt={24}>
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
      {selectedOption ===
        TextMessageScheduleOption.DAYS_AFTER_USER_DEFINED_TIME && (
        <>
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
            <Text fontSize={15}>
              {formatMessage(messages.sendDaysParticipant)}
            </Text>
          </Row>
          <Row mt={10} align="center">
            <VariableChooser
              disabled={disabled}
              onClick={onChangeVariable}
              placement="left"
              questionTypeWhitelist={[dateQuestion.id]}
              currentSessionId={sessionId}
              includeAllVariables
              includeCurrentSession
              includeNonDigitVariables
              isMultiSession
              sessionTypesWhiteList={[SessionTypes.CLASSIC_SESSION]}
            >
              <Badge bg={themeColors.primary} color={colors.white}>
                {variableValue ||
                  formatMessage(messages.daysAfterDateVariableEmpty)}
              </Badge>
            </VariableChooser>
            <Text ml={5}>
              {formatMessage(messages.daysAfterDateVariableInfo)}
            </Text>
          </Row>
        </>
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
  variableValue: PropTypes.string,
  frequency: PropTypes.string,
  formatMessage: PropTypes.func,
  onChangeOption: PropTypes.func,
  onChangeFrequency: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeVariable: PropTypes.func,
  disabled: PropTypes.bool,
  sessionId: PropTypes.string,
};

export default TextMessageScheduling;

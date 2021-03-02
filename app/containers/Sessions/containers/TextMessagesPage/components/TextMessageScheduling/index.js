import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Col as GCol, Row as GRow } from 'react-grid-system';

import Selector from 'components/Selector';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';
import ApprovableInput from 'components/Input/ApprovableInput';

import {
  MESSAGES_SCHEDULE_OPTIONS,
  MESSAGES_SCHEDULE_FREQUENCIES,
} from 'models/TextMessage/constants';
import { numericValidator } from 'utils/validators';

import messages from './messages';
import { StyledInputWrapper } from './styled';

const TextMessageScheduling = ({
  selectedOption,
  value,
  frequency,
  endAt,
  formatMessage,
  onChangeOption,
  onChangeValue,
  onChangeFrequency,
  onChangeEndAt,
  disabled,
}) => {
  const ALL_SCHEDULE_OPTIONS = {
    [MESSAGES_SCHEDULE_OPTIONS.afterFill]: {
      id: MESSAGES_SCHEDULE_OPTIONS.afterFill,
      label: formatMessage(messages[MESSAGES_SCHEDULE_OPTIONS.afterFill]),
    },
    [MESSAGES_SCHEDULE_OPTIONS.daysAfterFill]: {
      id: MESSAGES_SCHEDULE_OPTIONS.daysAfterFill,
      label: formatMessage(messages[MESSAGES_SCHEDULE_OPTIONS.daysAfterFill]),
    },
  };

  const ALL_FREQUENCIES = {
    [MESSAGES_SCHEDULE_FREQUENCIES.once]: {
      id: MESSAGES_SCHEDULE_FREQUENCIES.once,
      label: formatMessage(messages[MESSAGES_SCHEDULE_FREQUENCIES.once]),
    },
    [MESSAGES_SCHEDULE_FREQUENCIES.onceDay]: {
      id: MESSAGES_SCHEDULE_FREQUENCIES.onceDay,
      label: formatMessage(messages[MESSAGES_SCHEDULE_FREQUENCIES.onceDay]),
    },
    [MESSAGES_SCHEDULE_FREQUENCIES.onceWeek]: {
      id: MESSAGES_SCHEDULE_FREQUENCIES.onceWeek,
      label: formatMessage(messages[MESSAGES_SCHEDULE_FREQUENCIES.onceWeek]),
    },
    [MESSAGES_SCHEDULE_FREQUENCIES.onceMonth]: {
      id: MESSAGES_SCHEDULE_FREQUENCIES.onceMonth,
      label: formatMessage(messages[MESSAGES_SCHEDULE_FREQUENCIES.onceMonth]),
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
      {selectedOption === MESSAGES_SCHEDULE_OPTIONS.daysAfterFill && (
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
              setOption={onChangeFrequency}
              activeOption={ALL_FREQUENCIES[frequency]}
              disabled={disabled}
            />
          </Row>
        </GCol>
        <GCol>
          {frequency !== MESSAGES_SCHEDULE_FREQUENCIES.once && (
            <Row width="100%" align="center" mt={20}>
              <Text minWidth={70} fontWeight="bold" mr={5} fontSize={15}>
                {formatMessage(messages.finishBy)}
              </Text>
              <Row>
                <ApprovableInput
                  type="date"
                  placeholder={formatMessage(messages.date)}
                  validator={numericValidator}
                  height={50}
                  mr={0}
                  value={Date.parse(endAt)}
                  onCheck={dateValue =>
                    onChangeEndAt(dateValue.toLocaleString())
                  }
                  fontSize={15}
                  padding={5}
                  textAlign="center"
                  width={120}
                  minDate={new Date()}
                  disabled={disabled}
                />
              </Row>
            </Row>
          )}
        </GCol>
      </GRow>
    </Column>
  );
};

TextMessageScheduling.propTypes = {
  selectedOption: PropTypes.string,
  endAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  frequency: PropTypes.string,
  formatMessage: PropTypes.func,
  onChangeOption: PropTypes.func,
  onChangeFrequency: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeEndAt: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextMessageScheduling;

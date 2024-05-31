import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get, split, set, isEmpty } from 'lodash';
import { useIntl } from 'react-intl';

import { arrayValidator, numericValidator } from 'utils/validators';

import { editQuestionRequest } from 'global/reducers/questions';

import Row from 'components/Row';
import H3 from 'components/H3';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Text from 'components/Text';
import { DateInput } from 'components/Input/DateInput';
import { LocalizedDatePicker } from 'components/DatePicker';
import Checkbox from 'components/Checkbox';

import { Input } from '../styled';
import messages from './messages';
import {
  getTimeString,
  parseTime,
} from '../../../../../containers/QuestionListGroup/QuestionGroupSettingsModal/utils';

const SmsSettingsTab = ({
  editQuestion,
  acceptedAnswers,
  smsReminders,
  disabled,
}) => {
  const { formatMessage } = useIntl();
  const predefinedAnswers = get(acceptedAnswers, 'predefined', false);
  const rangeOfAnswers = get(acceptedAnswers, 'range', false);
  const remindersEnabled = !isEmpty(smsReminders);

  return (
    <>
      <Row justify="between" align="center" mb={8}>
        <H3>{formatMessage(messages.acceptedAnswersLabel)}</H3>
      </Row>
      <Row justify="between" align="center" mb={15}>
        <Column gap={12}>
          <Radio
            id="specified"
            onChange={() =>
              editQuestion({
                path: 'accepted_answers',
                value: { predefined: [] },
              })
            }
            checked={predefinedAnswers}
            disabled={disabled}
          >
            <Text>{formatMessage(messages.specified)}</Text>
          </Radio>
          <Radio
            id="random"
            onChange={() =>
              editQuestion({
                path: 'accepted_answers',
                value: {
                  range: { from: '0', to: '100' },
                },
              })
            }
            checked={rangeOfAnswers}
            disabled={disabled}
          >
            <Text>{formatMessage(messages.range)}</Text>
          </Radio>
        </Column>
      </Row>
      {predefinedAnswers && (
        <Row justify="between" align="center" mb={15}>
          <Column>
            <label htmlFor="predefined_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.predefinedValues)}
              </Text>
            </label>
            <Input
              id="predefined_values"
              type="singleline"
              value={acceptedAnswers.predefined}
              validator={arrayValidator}
              disabled={disabled}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers',
                  value: { predefined: v === '' ? [] : split(v, ',') },
                })
              }
              width="100%"
              px={12}
            />
          </Column>
        </Row>
      )}
      {rangeOfAnswers && (
        <Row justify="between" align="center" mb={15}>
          <Column mr={4}>
            <label htmlFor="range_from_accepted_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.rangeFromAcceptedValues)}
              </Text>
            </label>
            <Input
              id="range_from_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.from}
              validator={numericValidator()}
              disabled={disabled}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers.range.from',
                  value: v,
                })
              }
              width="100%"
              px={12}
            />
          </Column>
          <Column ml={4}>
            <label htmlFor="range_to_accepted_values">
              <Text
                mb={5}
                fontSize="12px"
                fontWeight="bold"
                width="fit-content"
              >
                {formatMessage(messages.rangeToAcceptedValues)}
              </Text>
            </label>
            <Input
              id="range_to_accepted_values"
              type="singleline"
              value={acceptedAnswers.range.to}
              disabled={disabled}
              validator={numericValidator()}
              onBlur={(v) =>
                editQuestion({
                  path: 'accepted_answers.range.to',
                  value: v,
                })
              }
              width="100%"
              px={12}
            />
          </Column>
        </Row>
      )}
      <Row justify="between" align="center" mb={15}>
        <Column>
          <label htmlFor="answer_if_wrong">
            <Text mb={5} fontSize="12px" fontWeight="bold" width="fit-content">
              {formatMessage(messages.answerIfWrong)}
            </Text>
          </label>
          <Input
            id="answer_if_wrong"
            type="singleline"
            value={acceptedAnswers?.answer_if_wrong}
            disabled={disabled}
            onBlur={(v) =>
              editQuestion({
                path: 'accepted_answers',
                value: set(acceptedAnswers, 'answer_if_wrong', v),
              })
            }
            width="100%"
            px={12}
          />
        </Column>
      </Row>
      <Row justify="between" align="center" mb={8}>
        <H3>{formatMessage(messages.remindersLabel)}</H3>
      </Row>
      <Row justify="between" align="center" mb={8}>
        <Checkbox
          id="reminders-switch"
          checked={remindersEnabled}
          disabled={disabled}
          onChange={(selected) => {
            const newSmsReminders = selected
              ? { per_hours: '', number_of_days: '', from: '', to: '' }
              : {};
            editQuestion({
              path: 'sms_reminders',
              value: newSmsReminders,
            });
          }}
        >
          {formatMessage(messages.remindersSubLabel)}
        </Checkbox>
      </Row>
      {remindersEnabled && (
        <>
          <Row justify="between" align="center" mb={15}>
            <Column>
              <label htmlFor="per_hours">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.perHoursLabel)}
                </Text>
              </label>
              <Input
                id="per_hours"
                type="singleline"
                value={smsReminders?.per_hours}
                validator={numericValidator}
                disabled={disabled}
                onBlur={(v) =>
                  editQuestion({
                    path: 'sms_reminders.per_hours',
                    value: v,
                  })
                }
                width="100%"
                px={12}
              />
            </Column>
          </Row>
          <Row justify="between" align="center" mb={15}>
            <Column>
              <label htmlFor="number_of_days">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.numberOfDaysLabel)}
                </Text>
              </label>
              <Input
                id="number_of_days"
                type="singleline"
                value={smsReminders?.number_of_days}
                validator={numericValidator}
                disabled={disabled}
                onBlur={(v) =>
                  editQuestion({
                    path: 'sms_reminders.number_of_days',
                    value: v,
                  })
                }
                width="100%"
                px={12}
              />
            </Column>
          </Row>
          <Row justify="between" align="center" mb={15} gap={8}>
            <Column>
              <label htmlFor="from">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.fromLabel)}
                </Text>
              </label>
              <LocalizedDatePicker
                id="from"
                selected={parseTime(smsReminders?.from)}
                onChange={(date) =>
                  editQuestion({
                    path: 'sms_reminders.from',
                    value: getTimeString(date),
                  })
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                calendarClassName="schedule-date-picker"
                customInput={<DateInput id="exact_time_picker" width="100%" />}
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={disabled}
              />
            </Column>
            <Column>
              <label htmlFor="to">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.toLabel)}
                </Text>
              </label>
              <LocalizedDatePicker
                id="to"
                selected={parseTime(smsReminders?.to)}
                onChange={(date) =>
                  editQuestion({
                    path: 'sms_reminders.to',
                    value: getTimeString(date),
                  })
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                calendarClassName="schedule-date-picker"
                customInput={<DateInput id="exact_time_picker" width="100%" />}
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={disabled}
              />
            </Column>
          </Row>
        </>
      )}
    </>
  );
};

SmsSettingsTab.propTypes = {
  editQuestion: PropTypes.func.isRequired,
  acceptedAnswers: PropTypes.object,
  smsReminders: PropTypes.object,
  disabled: PropTypes.bool,
};

const mapDispatchToProps = {
  editQuestion: editQuestionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(SmsSettingsTab);

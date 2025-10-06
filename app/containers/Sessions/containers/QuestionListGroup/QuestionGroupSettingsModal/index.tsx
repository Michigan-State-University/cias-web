import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  concat,
  filter,
  get,
  includes,
  mapKeys,
  snakeCase,
  set,
  compact,
} from 'lodash';

import { numericValidator } from 'utils/validators';
import { dayOfWeekAsString } from 'utils/dateUtils';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import { DAY_NUMBERS } from 'global/constants';
import { themeColors } from 'theme';

import { QuestionGroup, GroupType } from 'models/QuestionGroup';

import Modal from 'components/Modal';
import H3 from 'components/H3';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Text from 'components/Text';
import Column from 'components/Column';
import { LocalizedDatePicker } from 'components/DatePicker';
import { DateInput } from 'components/Input/DateInput';
import InequalityChooser from 'components/InequalityChooser';
import Box from 'components/Box';
import PlusCircle from 'components/Circle/PlusCircle';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Row from 'components/Row';

import messages from './messages';
import { Input } from '../../../components/QuestionSettings/Settings/Components/styled';
import VariableChooser from '../../../../VariableChooser';
import { getTimeString, parseTime } from './utils';

type QuestionGroupSettingsModalProps = {
  questionGroup: QuestionGroup;
  updateQuestionGroup: (
    changes: object,
    sessionId: string,
    questionGroupId: string,
  ) => void;
  sessionId: string;
  interventionId: string;
  modalVisible: boolean;
  setModalVisible: (modalState: boolean) => void;
  disabled: boolean;
};

const QuestionGroupSettingsModal = ({
  questionGroup,
  updateQuestionGroup,
  sessionId,
  interventionId,
  modalVisible,
  setModalVisible,
  disabled,
}: QuestionGroupSettingsModalProps) => {
  const { title, id, smsSchedule, formulas } = questionGroup;

  const [isVariableChooserOpen, setIsVariableChooserOpen] = useState(false);

  const { formatMessage } = useIntl();

  const handleModalClose = () => setModalVisible(false);

  const updateSmsSchedule = (
    path: string,
    value: string[] | number | object | boolean | null,
  ) => {
    const newSmsSchedule = set(smsSchedule, path, value);
    const transformedSchedule = mapKeys(newSmsSchedule, (v, k) => snakeCase(k));
    updateQuestionGroup({ sms_schedule: transformedSchedule }, sessionId, id);
  };

  const updateFormulas = (index: number, path: string, value: string) => {
    const formula = formulas[index];
    const newFormula = set(formula, path, value);
    formulas.splice(index, 1, newFormula);
    updateQuestionGroup({ formulas }, sessionId, id);
  };

  const specificQuestionsTime = get(smsSchedule, 'time.exact', false);
  const randomQuestionsTime = get(smsSchedule, 'time.range', false);
  const fromFirstQuestion = get(smsSchedule, 'startFromFirstQuestion', false);

  const handleAddNewFormula = () =>
    updateQuestionGroup(
      {
        formulas: compact(
          concat(formulas, [
            {
              payload: '',
              patterns: [
                {
                  match: '',
                },
              ],
            },
          ]),
        ),
      },
      sessionId,
      id,
    );

  const handleDayCheckboxSelection = (selected: boolean, dayNumber: string) =>
    selected
      ? updateSmsSchedule(
          'dayOfPeriod',
          compact(concat(smsSchedule?.dayOfPeriod, dayNumber)),
        )
      : updateSmsSchedule(
          'dayOfPeriod',
          filter(smsSchedule?.dayOfPeriod, (item) => item !== dayNumber),
        );

  return (
    <>
      <Modal
        visible={modalVisible}
        title={title}
        onClose={handleModalClose}
        maxWidth={1500}
      >
        <Row justify="between" align="center" mb={8}>
          <H3>{formatMessage(messages.questionsPerDay)}</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          <Input
            type="singleline"
            inputMode="numeric"
            value={smsSchedule?.questionsPerDay}
            validator={numericValidator}
            disabled={disabled}
            onBlur={(v: string) =>
              updateSmsSchedule('questionsPerDay', Number(v))
            }
            width="100%"
            px={12}
          />
        </Row>
        {questionGroup.type === GroupType.INITIAL && (
          <>
            <Row justify="between" align="center" mb={8}>
              <H3>{formatMessage(messages.numberOfRepetitions)}</H3>
            </Row>
            <Row justify="between" align="center" mb={15}>
              <Input
                type="singleline"
                inputMode="numeric"
                value={
                  smsSchedule?.numberOfRepetitions
                    ? String(smsSchedule.numberOfRepetitions)
                    : ''
                }
                validator={numericValidator}
                disabled={disabled}
                onBlur={(v: string) =>
                  updateSmsSchedule('numberOfRepetitions', v ? Number(v) : null)
                }
                width="100%"
                px={12}
              />
            </Row>
          </>
        )}
        <Row justify="between" align="center" mb={8}>
          <H3>{formatMessage(messages.dayOfPeriod)}</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          {DAY_NUMBERS.map((dayNumber) => (
            <Checkbox
              id={`day-of-period-${dayNumber}`}
              checked={includes(smsSchedule?.dayOfPeriod, dayNumber)}
              key={dayNumber}
              inlineLabel={false}
              disabled={disabled}
              onChange={(selected) =>
                handleDayCheckboxSelection(selected, dayNumber)
              }
            >
              {dayOfWeekAsString(Number(dayNumber))}
            </Checkbox>
          ))}
        </Row>
        <Row justify="between" align="center" mb={8}>
          <H3>{formatMessage(messages.time)}</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          <Column gap={12}>
            <Radio
              id="specified"
              onChange={() => updateSmsSchedule('time', { exact: '8:00 AM' })}
              checked={specificQuestionsTime}
              disabled={disabled}
            >
              <Text>{formatMessage(messages.timeSpecified)}</Text>
            </Radio>
            <Radio
              id="random"
              onChange={() =>
                updateSmsSchedule('time', {
                  range: { from: '8:00 AM', to: '9:00 AM' },
                })
              }
              checked={randomQuestionsTime}
              disabled={disabled}
            >
              <Text>{formatMessage(messages.timeRandom)}</Text>
            </Radio>
          </Column>
        </Row>
        {specificQuestionsTime && (
          <Row justify="between" align="center" mb={8}>
            <Column>
              <label htmlFor="exact_time_picker">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.timeSpecifiedLabel)}
                </Text>
              </label>
              <LocalizedDatePicker
                selected={parseTime(smsSchedule.time.exact)}
                onChange={(date) =>
                  updateSmsSchedule('time', { exact: getTimeString(date) })
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
        )}
        {randomQuestionsTime && (
          <Row justify="between" align="center" mb={8}>
            <Column mr={4}>
              <label htmlFor="random_from_time_picker">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.timeRandomFrom)}
                </Text>
              </label>
              <LocalizedDatePicker
                selected={parseTime(smsSchedule.time.range.from)}
                onChange={(date) =>
                  updateSmsSchedule('time', {
                    range: {
                      from: getTimeString(date),
                      to: smsSchedule.time.range.to,
                    },
                  })
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                calendarClassName="schedule-date-picker"
                customInput={
                  <DateInput id="random_from_time_picker" width="100%" />
                }
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={disabled}
              />
            </Column>
            <Column ml={4}>
              <label htmlFor="random_to_time_picker">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  {formatMessage(messages.timeRandomTo)}
                </Text>
              </label>
              <LocalizedDatePicker
                selected={parseTime(smsSchedule.time.range.to)}
                onChange={(date) =>
                  updateSmsSchedule('time', {
                    range: {
                      from: smsSchedule.time.range.from,
                      to: getTimeString(date),
                    },
                  })
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                calendarClassName="schedule-date-picker"
                customInput={
                  <DateInput id="random_to_time_picker" width="100%" />
                }
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={disabled}
              />
            </Column>
          </Row>
        )}
        {(randomQuestionsTime || specificQuestionsTime) && (
          <Row justify="between" align="center" mb={15}>
            <Checkbox
              id="overwrite_user_time_settings"
              checked={smsSchedule.overwriteUserTimeSettings}
              disabled={disabled}
              onChange={(selected) =>
                selected
                  ? updateSmsSchedule('overwriteUserTimeSettings', true)
                  : updateSmsSchedule('overwriteUserTimeSettings', false)
              }
            >
              {formatMessage(messages.overwriteUserTimeSettings)}
            </Checkbox>
          </Row>
        )}
        <Row justify="between" align="center" mb={8}>
          <H3>{formatMessage(messages.sendingOrder)}</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          <Column gap={12}>
            <Radio
              id="fromLastAnswer"
              onChange={() =>
                updateSmsSchedule('startFromFirstQuestion', false)
              }
              checked={!fromFirstQuestion}
              disabled={disabled}
            >
              <Text>{formatMessage(messages.fromLastAnswer)}</Text>
            </Radio>
            <Radio
              id="fromFirstQuestion"
              onChange={() => updateSmsSchedule('startFromFirstQuestion', true)}
              checked={fromFirstQuestion}
              disabled={disabled}
            >
              <Text>{formatMessage(messages.fromFirstQuestion)}</Text>
            </Radio>
          </Column>
        </Row>
        <Row justify="between" align="center" mb={8}>
          <H3>{formatMessage(messages.conditions)}</H3>
        </Row>
        {formulas?.length > 0 &&
          formulas.map(
            (
              formula: { payload: string; patterns: Array<{ match: string }> },
              index: number,
            ) => (
              <>
                <Row justify="between" align="center" key={index}>
                  {formatMessage(messages.formula)}
                  <div>
                    <VariableChooser
                      currentSessionId={sessionId}
                      disabled={disabled}
                      currentInterventionId={interventionId}
                      onClick={(value: string) =>
                        updateFormulas(
                          index,
                          'payload',
                          `${formula.payload}${value}`,
                        )
                      }
                      includeAllVariables
                      includeCurrentQuestion
                      includeAllSessions
                      includeCurrentSession
                      isMultiSession
                      // @ts-ignore
                      selectedQuestion={null}
                      setIsOpen={setIsVariableChooserOpen}
                    >
                      <Text
                        fontWeight="bold"
                        color={themeColors.secondary}
                        hoverDecoration="underline"
                      >
                        {formatMessage(messages.addVariable)}
                      </Text>
                    </VariableChooser>
                  </div>
                </Row>
                <Row justify="between" align="center" mb={8}>
                  <Input
                    placeholder="Enter formula here..."
                    type="singleline"
                    value={formula?.payload || ''}
                    onBlur={(val: string) =>
                      updateFormulas(index, 'payload', val)
                    }
                    width="100%"
                    disabled={disabled}
                    px={12}
                    forceBlur={isVariableChooserOpen}
                  />
                </Row>
                <Row justify="between" align="center" mb={15}>
                  If
                  <InequalityChooser
                    height={50}
                    width={200}
                    disabled={disabled}
                    onSuccessfulChange={(value) =>
                      updateFormulas(index, 'patterns[0].match', value)
                    }
                    inequalityValue={formula.patterns[0].match}
                  />
                  <Img
                    ml={10}
                    src={binNoBg}
                    onClick={() => {
                      formulas.splice(index, 1);
                      updateQuestionGroup(
                        {
                          formulas,
                        },
                        sessionId,
                        id,
                      );
                    }}
                    clickable
                    width="20px"
                    height="20px"
                  />
                </Row>
              </>
            ),
          )}
        <Row justify="between" align="center" mb={8}>
          <HoverableBox
            px={21}
            py={14}
            width="100%"
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={handleAddNewFormula}
            disabled={disabled}
          >
            <Box>
              <Row align="center">
                <PlusCircle mr={12} />
                <Text fontWeight="bold" color={themeColors.secondary}>
                  <FormattedMessage {...messages.addNewFormula} />
                </Text>
              </Row>
            </Box>
          </HoverableBox>
        </Row>
      </Modal>
    </>
  );
};

export default QuestionGroupSettingsModal;

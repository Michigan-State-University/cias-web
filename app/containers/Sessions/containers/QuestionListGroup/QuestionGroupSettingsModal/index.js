import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import {
  concat,
  filter,
  get,
  includes,
  mapKeys,
  snakeCase,
  update,
  compact,
} from 'lodash';
import { FormattedMessage } from 'react-intl';
import Modal from '../../../../../components/Modal';
import { numericValidator } from '../../../../../utils/validators';
import { Input } from '../../../components/QuestionSettings/Settings/Components/styled';
import H3 from '../../../../../components/H3';
import Checkbox from '../../../../../components/Checkbox';
import { dayOfWeekAsString } from '../../../../../utils/dateUtils';
import Radio from '../../../../../components/Radio';
import Text from '../../../../../components/Text';
import Column from '../../../../../components/Column';
import { LocalizedDatePicker } from '../../../../../components/DatePicker';
import { DateInput } from '../../../../../components/Input/DateInput';
import { themeColors } from '../../../../../theme';
import VariableChooser from '../../../../VariableChooser';
import InequalityChooser from '../../../../../components/InequalityChooser';
import Box from '../../../../../components/Box';
import PlusCircle from '../../../../../components/Circle/PlusCircle';
import messages from '../../../components/QuestionSettings/Settings/Components/messages';
import HoverableBox from '../../../../../components/Box/HoverableBox';
import Img from '../../../../../components/Img';
import binNoBg from '../../../../../assets/svg/bin-no-bg.svg';

const QuestionGroupSettingsModal = ({
  questionGroup,
  questionGroup: { smsSchedule, formulas },
  updateQuestionGroup,
  sessionId,
  interventionId,
  modalVisible,
  setModalVisible,
}) => {
  const { title, id } = questionGroup;

  const [isVariableChooserOpen, setIsVariableChooserOpen] = useState(false);

  const handleModalClose = () => setModalVisible(false);

  const updateSmsSchedule = (path, value) => {
    const newSmsSchedule = update(smsSchedule, path, () => value);
    const transformedSchedule = mapKeys(newSmsSchedule, (v, k) => snakeCase(k));
    updateQuestionGroup({ sms_schedule: transformedSchedule }, sessionId, id);
  };

  const updateFormulas = (index, path, value) => {
    const formula = formulas[index];
    const newFormula = update(formula, path, () => value);
    formulas.splice(index, 1, newFormula);
    updateQuestionGroup({ formulas }, sessionId, id);
  };

  const parseTime = (t) => {
    const d = new Date();
    const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1], 10) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2], 10) || 0);
    return d;
  };

  const getTimeString = (date) => {
    const newTime = date.toLocaleTimeString('en-US');
    const amPm = newTime.split(' ')[1];
    const seconds = newTime.split(':')[2].replace(amPm, '');
    return newTime.replace(`:${seconds}`, ' ');
  };

  const specificQuestionsTime = get(smsSchedule, 'time.exact', false);
  const randomQuestionsTime = get(smsSchedule, 'time.range', false);

  const renderModal = () => (
    <>
      {/* @ts-ignore */}
      <Modal
        visible={modalVisible}
        title={title}
        onClose={handleModalClose}
        maxWidth={1500}
      >
        <Row justify="between" align="center" mb={8}>
          <H3>Number of Messages per day</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          <Input
            placeholder="Number of messages per day"
            type="singleline"
            keyboard="tel"
            value={smsSchedule?.questionsPerDay}
            validator={numericValidator}
            onBlur={(v) => updateSmsSchedule('questionsPerDay', Number(v))}
            width="100%"
            px={12}
          />
        </Row>
        <Row justify="between" align="center" mb={8}>
          <H3>Day of Message</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          {['0', '1', '2', '3', '4', '5', '6'].map((dayNumber) => (
            <Checkbox
              id={`day-of-period-${dayNumber}`}
              checked={includes(smsSchedule?.dayOfPeriod, dayNumber)}
              inlineLabel={false}
              onChange={(selected) =>
                selected
                  ? updateSmsSchedule(
                      'dayOfPeriod',
                      compact(concat(smsSchedule?.dayOfPeriod, dayNumber)),
                    )
                  : updateSmsSchedule(
                      'dayOfPeriod',
                      filter(
                        smsSchedule?.dayOfPeriod,
                        (item) => item !== dayNumber,
                      ),
                    )
              }
            >
              {dayOfWeekAsString(Number(dayNumber))}
            </Checkbox>
          ))}
        </Row>
        <Row justify="between" align="center" mb={8}>
          <H3>Time of the Message</H3>
        </Row>
        <Row justify="between" align="center" mb={15}>
          <Column gap={12}>
            <Radio
              id="specified"
              onChange={() => updateSmsSchedule('time', { exact: '8:00 AM' })}
              checked={specificQuestionsTime}
            >
              <Text>Specified</Text>
            </Radio>
            <Radio
              id="random"
              onChange={() =>
                updateSmsSchedule('time', {
                  range: { from: '8:00 AM', to: '9:00 AM' },
                })
              }
              checked={randomQuestionsTime}
            >
              <Text>Random</Text>
            </Radio>
          </Column>
        </Row>
        {specificQuestionsTime && (
          <Row justify="between" align="center" mb={15}>
            <Column>
              <label htmlFor="exact_time_picker">
                <Text
                  mb={5}
                  fontSize="12px"
                  fontWeight="bold"
                  width="fit-content"
                >
                  Exact Time
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
                  From
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
                  To
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
              />
            </Column>
          </Row>
        )}
        {randomQuestionsTime ||
          (specificQuestionsTime && (
            <Row justify="between" align="center" mb={15}>
              <Checkbox
                id="overwrite_user_time_settings"
                checked={smsSchedule.overwriteUserTimeSettings}
                onChange={(selected) =>
                  selected
                    ? updateSmsSchedule('overwriteUserTimeSettings', true)
                    : updateSmsSchedule('overwriteUserTimeSettings', false)
                }
              >
                Overwrite participant’s preferred time
              </Checkbox>
            </Row>
          ))}
        <Row justify="between" align="center" mb={8}>
          <H3>Conditions</H3>
        </Row>
        {formulas?.length > 0 &&
          formulas.map((formula, index) => (
            <>
              <Row justify="between" align="center">
                Formula
                <div>
                  <VariableChooser
                    currentSessionId={sessionId}
                    currentInterventionId={interventionId}
                    onClick={(value) =>
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
                    selectedQuestion={null}
                    setIsOpen={setIsVariableChooserOpen}
                  >
                    <Text
                      fontWeight="bold"
                      color={themeColors.secondary}
                      hoverDecoration="underline"
                    >
                      + Add variable
                    </Text>
                  </VariableChooser>
                </div>
              </Row>
              <Row justify="between" align="center" mb={8}>
                <Input
                  placeholder="Enter formula here..."
                  type="singleline"
                  value={formula?.payload || ''}
                  onBlur={(val) => updateFormulas(index, 'payload', val)}
                  width="100%"
                  px={12}
                  forceBlur={isVariableChooserOpen}
                />
              </Row>
              <Row justify="between" align="center" mb={15}>
                If
                <InequalityChooser
                  height={50}
                  width={200}
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
          ))}
        <Row justify="between" align="center" mb={8}>
          <HoverableBox
            px={21}
            py={14}
            width="100%"
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={() =>
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
              )
            }
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

  return renderModal();
};

QuestionGroupSettingsModal.propTypes = {
  questionGroup: PropTypes.object,
  updateQuestionGroup: PropTypes.func,
  sessionId: PropTypes.string,
};

export default QuestionGroupSettingsModal;

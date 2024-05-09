import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import {includes, mapKeys, snakeCase, update, filter, concat} from 'lodash';
import Modal from '../../../../../components/Modal';
import { numericValidator } from '../../../../../utils/validators';
import { Input } from '../../../components/QuestionSettings/Settings/Components/styled';
import H3 from '../../../../../components/H3';
import Checkbox from "../../../../../components/Checkbox";
import messages from "../../../../../components/TimeRanges/messages";
import {dayOfWeekAsString} from "../../../../../utils/dateUtils";

const QuestionGroupSettingsModal = ({
  questionGroup,
  questionGroup: { smsSchedule, formulas },
  updateQuestionGroup,
  sessionId,
  modalVisible,
  setModalVisible,
}) => {
  const { title, id } = questionGroup;

  const handleModalClose = () => setModalVisible(false);

  const updateSmsSchedule = (path, value) => {
    const newSmsSchedule = update(smsSchedule, path, () => value);
    const transformedSchedule = mapKeys(newSmsSchedule, (v, k) =>
      snakeCase(k),
    );
    updateQuestionGroup({ sms_schedule: transformedSchedule }, sessionId, id);
  };

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
          <H3>Number of messages per day</H3>
        </Row>
        <Row justify="between" align="center" mb={10}>
          <Input
            placeholder="Number of messages per day"
            type="singleline"
            keyboard="tel"
            value={smsSchedule.questionsPerDay}
            validator={numericValidator}
            onBlur={(v) => updateSmsSchedule('questionsPerDay', Number(v))}
            width={300}
            px={12}
          />
        </Row>
        <Row justify="between" align="center" mb={8}>
          <H3>Day of message</H3>
        </Row>
        <Row justify="between" align="center" mb={10}>
          {['0', '1', '2', '3', '4', '5', '6'].map((dayNumber) => (
            <Checkbox
              id={`day-of-period-${dayNumber}`}
              checked={includes(smsSchedule.dayOfPeriod, dayNumber)}
              onChange={(selected) =>
                selected
                  ? updateSmsSchedule(
                      'dayOfPeriod',
                      concat(smsSchedule.dayOfPeriod, dayNumber),
                    )
                  : updateSmsSchedule(
                      'dayOfPeriod',
                      filter(
                        smsSchedule.dayOfPeriod,
                        (item) => item !== dayNumber,
                      ),
                    )
              }
            >
              {dayOfWeekAsString(Number(dayNumber))}
            </Checkbox>
          ))}
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

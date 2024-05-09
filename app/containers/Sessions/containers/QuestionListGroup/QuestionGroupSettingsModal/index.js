import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import {mapKeys, snakeCase, update} from 'lodash';
import Modal from '../../../../../components/Modal';
import { numericValidator } from '../../../../../utils/validators';
import { Input } from '../../../components/QuestionSettings/Settings/Components/styled';
import H3 from '../../../../../components/H3';

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
        <Row justify="between" align="center" mb={2}>
          <H3>Number of messages per day</H3>
        </Row>
        <Row justify="between" align="center">
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

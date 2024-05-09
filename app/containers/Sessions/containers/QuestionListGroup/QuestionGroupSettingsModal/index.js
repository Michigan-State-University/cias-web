import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
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

  const renderModal = () => (
    <>
      {/* @ts-ignore */}
      <Modal
        visible={modalVisible}
        title={title}
        onClose={handleModalClose}
        maxWidth={1500}
      >
        <Row justify="between" align="center" pb={15} mb={15}>
          <H3>Days per message</H3>
          <Input
            placeholder="days per message"
            type="singleline"
            keyboard="tel"
            value=""
            validator={numericValidator}
            onBlur={(v) =>
              updateQuestionGroup(
                { title: `Initial Group Sms ${v}` },
                sessionId,
                id,
              )
            }
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

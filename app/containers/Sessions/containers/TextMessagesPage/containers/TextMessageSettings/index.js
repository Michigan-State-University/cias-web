import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from 'components/Text';
import Row from 'components/Row';
import {
  changeSchedulingType,
  changeSchedulingValue,
  changeSchedulingVariable,
  changeSchedulingFrequency,
  fetchVariantsAndPhonesRequest,
  removeTextMessageRequest,
  changeTileName,
  cloneTextMessageRequest,
  changeType,
} from 'global/reducers/textMessages';

import binNoBg from 'assets/svg/bin-no-bg.svg';
import copy from 'assets/svg/copy.svg';

import { TextMessageType } from 'models/TextMessage';

import { colors } from 'theme';

import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import { ModalType, useModal } from 'components/Modal';
import { ImageButton } from 'components/Button';

import TextMessagesFormula from '../../components/TextMessagesFormula';
import TextMessageVariants from '../../components/TextMessageVariants';
import { StyledSmsSettings, SectionDivider } from './styled';
import { TextMessagesContext } from '../../utils';
import messages from './messages';
import TextMessageScheduling from '../../components/TextMessageScheduling';
import FormulaSwitcher from '../../components/FormulaSwitcher';
import NoFormulaMessage from '../../components/NoFormulaMessages';
import { TextMessageTypeChooser } from '../../components/TextMessageTypeChooser';
import { ParticipantPersonalData } from '../../components/ParticipantPersonalData';
import { AlertPhones } from '../../components/AlertPhones';

const TextMessageSettings = ({
  changeSchedulingTypeAction,
  changeSchedulingValueAction,
  changeSchedulingVariableAction,
  changeSchedulingFrequencyAction,
  fetchVariantsAndPhones,
  removeTextMessage,
  changeTileNameAction,
  cloneTextMessage,
  changeTypeAction,
  sessionId,
}) => {
  const {
    formatMessage,
    editingPossible,
    selectedMessage: {
      id,
      name,
      schedule,
      frequency,
      schedulePayload,
      scheduleVariable,
      formula,
      endAt,
      isUsedFormula,
      noFormulaText,
      noFormulaAttachment,
      originalText,
      type,
    },
    selectedMessageState: { uploadAttachmentLoading, uploadAttachmentError },
  } = useContext(TextMessagesContext);

  useEffect(() => {
    fetchVariantsAndPhones();
  }, [id]);

  const onDelete = useCallback(() => {
    removeTextMessage(id);
  }, [id]);

  const { openModal: openDeleteModal, Modal: DeleteModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteTextMessageHeader),
      content: formatMessage(messages.deleteTextMessageMessage),
      confirmAction: onDelete,
    },
  });

  return (
    <StyledSmsSettings>
      <DeleteModal />

      <Row align="center" justify="between">
        <Text fontSize={18} fontWeight="bold">
          {formatMessage(messages.header)}
        </Text>
        <div>
          <ImageButton
            title={formatMessage(messages.cloneIcon)}
            src={copy}
            onClick={() => cloneTextMessage(id)}
            disabled={!editingPossible}
            mr={10}
          />

          <ImageButton
            title={formatMessage(messages.deleteIcon)}
            src={binNoBg}
            onClick={openDeleteModal}
            mr={10}
            disabled={!editingPossible}
          />
        </div>
      </Row>

      <Box bg={colors.linkWater} width="100%" mt={20} padding={8}>
        <StyledInput
          type="multiline"
          rows="1"
          width="100%"
          placeholder={formatMessage(messages.textMessageName)}
          value={name}
          onBlur={changeTileNameAction}
          disabled={!editingPossible}
        />
      </Box>

      <SectionDivider />

      <TextMessageTypeChooser
        type={type}
        onTypeChange={changeTypeAction}
        disabled={!editingPossible}
      />

      {type === TextMessageType.NORMAL && (
        <TextMessageScheduling
          id={id}
          selectedOption={schedule}
          frequency={frequency}
          endAt={endAt}
          formatMessage={formatMessage}
          value={schedulePayload}
          variableValue={scheduleVariable}
          onChangeOption={changeSchedulingTypeAction}
          onChangeValue={changeSchedulingValueAction}
          onChangeVariable={changeSchedulingVariableAction}
          onChangeFrequency={changeSchedulingFrequencyAction}
          disabled={!editingPossible}
          sessionId={sessionId}
        />
      )}

      <SectionDivider />
      <FormulaSwitcher isUsedFormula={isUsedFormula} />
      {isUsedFormula && (
        <>
          <TextMessagesFormula disabled={!editingPossible} formula={formula} />
          <TextMessageVariants textMessageId={id} />
        </>
      )}
      {!isUsedFormula && (
        <NoFormulaMessage
          id={id}
          noFormulaText={noFormulaText}
          noFormulaAttachment={noFormulaAttachment}
          uploadAttachmentLoading={uploadAttachmentLoading}
          uploadAttachmentError={uploadAttachmentError}
          originalText={originalText}
        />
      )}

      {type === TextMessageType.ALERT && (
        <>
          <ParticipantPersonalData disabled={!editingPossible} />
          <AlertPhones disabled={!editingPossible} />
        </>
      )}
    </StyledSmsSettings>
  );
};

TextMessageSettings.propTypes = {
  changeSchedulingTypeAction: PropTypes.func,
  changeSchedulingValueAction: PropTypes.func,
  changeSchedulingVariableAction: PropTypes.func,
  changeSchedulingFrequencyAction: PropTypes.func,
  fetchVariantsAndPhones: PropTypes.func,
  removeTextMessage: PropTypes.func,
  changeTileNameAction: PropTypes.func,
  cloneTextMessage: PropTypes.func,
  changeTypeAction: PropTypes.func,
  sessionId: PropTypes.string,
};

const mapDispatchToProps = {
  changeSchedulingTypeAction: changeSchedulingType,
  changeSchedulingValueAction: changeSchedulingValue,
  changeSchedulingVariableAction: changeSchedulingVariable,
  changeSchedulingFrequencyAction: changeSchedulingFrequency,
  changeTileNameAction: changeTileName,
  fetchVariantsAndPhones: fetchVariantsAndPhonesRequest,
  removeTextMessage: removeTextMessageRequest,
  cloneTextMessage: cloneTextMessageRequest,
  changeTypeAction: changeType,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(TextMessageSettings);

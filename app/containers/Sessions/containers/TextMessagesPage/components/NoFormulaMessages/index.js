import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { colors, themeColors } from 'theme';

import { VariableHelper } from 'models/Helpers';
import {
  currencyQuestion,
  dateQuestion,
  nameQuestion,
  numberQuestion,
  textboxQuestion,
  visualAnalogueScaleQuestion,
} from 'models/Session/QuestionTypes';
import { SessionTypes } from 'models/Session';

import { MAX_SMS_BODY_LENGTH } from 'global/constants';
import {
  changeNoFormulaText,
  uploadTextMessageAttachmentRequest,
  deleteTextMessageAttachmentRequest,
  createSmsLinkRequest,
} from 'global/reducers/textMessages';

import VariableChooser from 'containers/VariableChooser';
import SmsLinkModal from 'containers/SmsLinkModal';

import { NoMarginRow } from 'components/ReactGridSystem';
import Text from 'components/Text';
import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import OriginalTextHover from 'components/OriginalTextHover';

import messages from './messages';
import { TextMessagesContext } from '../../utils';
import settingsMessages from '../../containers/TextMessageSettings/messages';
import { TextMessageAttachment } from '../TextMessageAttachment';
import { SmsLinksList } from '../SmsLinksList';

const originalTextIconProps = {
  position: 'absolute',
  right: 21,
  bottom: 2,
};

const NoFormulaMessage = ({
  id,
  noFormulaText,
  noFormulaAttachment,
  originalText,
  changeAction,
  uploadAttachment,
  deleteAttachment,
  addLink,
  uploadAttachmentLoading,
  uploadAttachmentError,
}) => {
  const {
    selectedMessage,
    sessionId,
    interventionId,
    formatMessage,
    editingPossible,
  } = useContext(TextMessagesContext);

  const handleAddVariable = (variable) => {
    const variableHelper = new VariableHelper(variable);

    changeAction(
      `${
        noFormulaText ?? ''
      }${variableHelper.getFormattedVariableForDynamicInput()}`,
    );
  };

  const handleAddLink = (linkType, url, variable) => {
    addLink(id, linkType, url, variable);

    const text = noFormulaText ?? '';

    if (variable && !text.includes(`::${variable}::`))
      changeAction(`${text}::${variable}::`);
  };

  const handleAddAttachment = useCallback(
    (file) => {
      uploadAttachment(id, file);
    },
    [id],
  );

  const handleDeleteAttachment = useCallback(() => {
    deleteAttachment(id);
  }, [id]);

  return (
    <Column justify="center">
      <NoMarginRow justify="between" width="100%" gap={13}>
        <Text>{formatMessage(messages.label)}</Text>
        <NoMarginRow gap={20}>
          <SmsLinkModal
            disabled={!editingPossible}
            placement="right"
            onClick={handleAddLink}
          >
            <Text fontWeight="bold" color={themeColors.secondary}>
              {formatMessage(settingsMessages.addLinkButton)}
            </Text>
          </SmsLinkModal>
          <VariableChooser
            disabled={!editingPossible}
            currentInterventionId={interventionId}
            onClick={handleAddVariable}
            placement="right"
            questionTypeWhitelist={[
              dateQuestion.id,
              textboxQuestion.id,
              numberQuestion.id,
              visualAnalogueScaleQuestion.id,
              currencyQuestion.id,
              nameQuestion.id,
            ]}
            currentSessionId={sessionId}
            includeAllVariables
            includeCurrentSession
            includeNonDigitVariables
            isMultiSession
            sessionTypesWhiteList={[SessionTypes.CLASSIC_SESSION]}
          >
            <Text fontWeight="bold" color={themeColors.secondary}>
              {formatMessage(settingsMessages.addVariableButton)}
            </Text>
          </VariableChooser>
        </NoMarginRow>
      </NoMarginRow>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
        <OriginalTextHover
          id={`sms-no-formula-message-${id}`}
          text={originalText?.noFormulaText}
          position="relative"
          mr={-9}
          iconProps={originalTextIconProps}
        >
          <StyledInput
            disabled={!editingPossible}
            type="multiline"
            rows="5"
            width="100%"
            placeholder={formatMessage(messages.textMessagePlaceholder)}
            value={noFormulaText || ''}
            onBlur={changeAction}
            maxLength={MAX_SMS_BODY_LENGTH}
          />
        </OriginalTextHover>
      </Box>
      <SmsLinksList
        smsPlanId={id}
        availableSmsLinks={selectedMessage.smsLinks}
      />
      <TextMessageAttachment
        attachment={noFormulaAttachment}
        loading={uploadAttachmentLoading}
        error={uploadAttachmentError}
        onAdd={handleAddAttachment}
        onDelete={handleDeleteAttachment}
        editingPossible={editingPossible}
      />
    </Column>
  );
};

NoFormulaMessage.propTypes = {
  id: PropTypes.string,
  changeAction: PropTypes.func,
  uploadAttachment: PropTypes.func,
  deleteAttachment: PropTypes.func,
  addLink: PropTypes.func,
  noFormulaText: PropTypes.string,
  noFormulaAttachment: PropTypes.object,
  originalText: PropTypes.object,
  uploadAttachmentLoading: PropTypes.bool,
  uploadAttachmentError: PropTypes.object,
};

const mapDispatchToProps = {
  changeAction: changeNoFormulaText,
  uploadAttachment: uploadTextMessageAttachmentRequest,
  deleteAttachment: deleteTextMessageAttachmentRequest,
  addLink: createSmsLinkRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(NoFormulaMessage);

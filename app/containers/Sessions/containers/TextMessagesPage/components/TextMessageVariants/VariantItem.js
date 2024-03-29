import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { injectIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import ReorderIcon from 'assets/svg/reorder-hand.svg';

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

import VariableChooser from 'containers/VariableChooser';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Text from 'components/Text';
import Img from 'components/Img';
import Collapse from 'components/Collapse';
import InequalityChooser from 'components/InequalityChooser';
import H2 from 'components/H2';
import { NoMarginRow } from 'components/ReactGridSystem';
import OriginalTextHover from 'components/OriginalTextHover';

import {
  changeFormulaMatch,
  changeContent,
  removeTextMessageVariantRequest,
  changeSelectedVariantId,
  deleteTextMessageVariantAttachmentRequest,
  uploadTextMessageVariantAttachmentRequest,
} from 'global/reducers/textMessages';

import { ModalType, useModal } from 'components/Modal';
import settingsMessages from '../../containers/TextMessageSettings/messages';
import { TextMessagesContext } from '../../utils';
import messages from './messages';
import { TextMessageAttachment } from '../TextMessageAttachment';

const originalTextIconProps = {
  position: 'absolute',
  right: 21,
  bottom: 12,
};

const VariantItem = ({
  open,
  index,
  variant: { id, formulaMatch, content, originalText, attachment },
  changeFormulaMatchAction,
  changeContentAction,
  removeVariant,
  disabled,
  changeSelectedVariant,
  dragHandleProps,
  textMessageId,
  variantState,
  uploadAttachment,
  deleteAttachment,
}) => {
  const { sessionId, interventionId, formatMessage, editingPossible } =
    useContext(TextMessagesContext);

  const { uploadAttachmentLoading } = variantState;

  const toggleCollapsable = () => {
    if (open) changeSelectedVariant('');
    else changeSelectedVariant(id);
  };

  const handleFormulaMatchChange = (value) => {
    changeFormulaMatchAction(value, id);
  };

  const handleContentChange = (value) => {
    changeContentAction(value, id);
  };

  const handleDeleteCase = () => {
    removeVariant(id);
  };

  const handleAddVariable = (variable) => {
    const variableHelper = new VariableHelper(variable);

    handleContentChange(
      `${content}${variableHelper.getFormattedVariableForDynamicInput()}`,
    );
  };

  const { openModal: openDeleteModal, Modal: DeleteModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteCaseHeader),
      content: formatMessage(messages.deleteCaseMessage),
      confirmAction: handleDeleteCase,
    },
  });

  const handleAddAttachment = useCallback(
    (file) => {
      uploadAttachment(textMessageId, id, file);
    },
    [textMessageId, id],
  );

  const handleDeleteAttachment = useCallback(() => {
    deleteAttachment(textMessageId, id);
  }, [textMessageId, id]);

  return (
    <Collapse
      disabled
      isOpened={open}
      onToggle={toggleCollapsable}
      height="auto"
      px={0}
      bgOpacity={0}
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      imgWithBackground
      label={
        <Row align="center" justify="between" style={{ paddingRight: 10 }}>
          <Col>
            <H2>
              {formatMessage(messages.case, {
                index,
              })}
            </H2>
            {formulaMatch && (
              <Text color={colors.grey}>
                {formatMessage(messages.formulaMatchLookup, {
                  formulaMatch,
                })}
              </Text>
            )}
          </Col>
        </Row>
      }
      extraIcons={
        disabled ? null : (
          <Img
            mr={10}
            src={ReorderIcon}
            cursor="grab"
            disabled={false}
            {...dragHandleProps}
          />
        )
      }
    >
      <Container style={{ width: '100%' }}>
        <DeleteModal />

        <Row justfy="between" align="center" style={{ marginBottom: 20 }}>
          <Col width="content">
            <Row align="center">
              <Img
                disabled={disabled}
                src={binNoBg}
                onClick={openDeleteModal}
                mr={10}
                clickable
              />
              <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
              <InequalityChooser
                onSuccessfulChange={handleFormulaMatchChange}
                inequalityValue={formulaMatch}
                disabled={disabled}
              />
            </Row>
          </Col>
        </Row>

        <Row justfy="start">
          <NoMarginRow justify="between" width="100%">
            <Text whiteSpace="pre">
              {formatMessage(messages.sectionCaseContentHeader)}
            </Text>
            <VariableChooser
              disabled={disabled}
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
          <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
            <OriginalTextHover
              id={`sms-variant-${index}`}
              text={originalText?.content}
              position="relative"
              mr={-9}
              iconProps={originalTextIconProps}
            >
              <StyledInput
                type="multiline"
                rows="5"
                width="100%"
                placeholder={formatMessage(
                  messages.sectionCaseContentPlaceholder,
                )}
                value={content}
                onBlur={handleContentChange}
                disabled={disabled}
                maxLength={MAX_SMS_BODY_LENGTH}
              />
            </OriginalTextHover>
          </Box>
          <TextMessageAttachment
            attachment={attachment}
            loading={uploadAttachmentLoading}
            onAdd={handleAddAttachment}
            onDelete={handleDeleteAttachment}
            editingPossible={editingPossible}
          />
        </Row>
      </Container>
    </Collapse>
  );
};

VariantItem.propTypes = {
  open: PropTypes.bool,
  index: PropTypes.number,
  variant: PropTypes.object,
  changeFormulaMatchAction: PropTypes.func,
  changeContentAction: PropTypes.func,
  removeVariant: PropTypes.func,
  disabled: PropTypes.bool,
  changeSelectedVariant: PropTypes.func,
  dragHandleProps: PropTypes.object,
  textMessageId: PropTypes.string,
  variantState: PropTypes.object,
  uploadAttachment: PropTypes.func,
  deleteAttachment: PropTypes.func,
};
VariantItem.defaultProps = {
  open: false,
};

const mapDispatchToProps = {
  changeFormulaMatchAction: changeFormulaMatch,
  changeContentAction: changeContent,
  removeVariant: removeTextMessageVariantRequest,
  changeSelectedVariant: changeSelectedVariantId,
  uploadAttachment: uploadTextMessageVariantAttachmentRequest,
  deleteAttachment: deleteTextMessageVariantAttachmentRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, injectIntl)(VariantItem);

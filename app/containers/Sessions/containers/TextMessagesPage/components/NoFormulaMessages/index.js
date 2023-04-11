import React, { useContext } from 'react';
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
import {
  changeNoFormulaText,
  uploadTextMessageImageRequest,
  deleteTextMessageImageRequest,
} from 'global/reducers/textMessages';

import VariableChooser from 'containers/VariableChooser';

import { NoMarginRow } from 'components/ReactGridSystem';
import Text from 'components/Text';
import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import OriginalTextHover from 'components/OriginalTextHover';
import ImageUpload from 'components/ImageUpload';

import messages from './messages';
import { TextMessagesContext } from '../../utils';
import settingsMessages from '../../containers/TextMessageSettings/messages';

const originalTextIconProps = {
  position: 'absolute',
  right: 21,
  bottom: 12,
};

const NoFormulaMessage = ({
  id,
  noFormulaText,
  noFormulaImageUrl,
  originalText,
  changeAction,
  uploadImage,
  deleteImage,
  uploadImageLoading,
}) => {
  const { sessionId, interventionId, formatMessage, editingPossible } =
    useContext(TextMessagesContext);

  const handleAddVariable = (variable) => {
    const variableHelper = new VariableHelper(variable);

    changeAction(
      `${
        noFormulaText ?? ''
      }${variableHelper.getFormattedVariableForDynamicInput()}`,
    );
  };

  const handleAddImage = (image) => {
    uploadImage(id, image.image);
  };

  const handleDeleteImage = () => {
    deleteImage(id);
  };

  return (
    <Column justify="center">
      <NoMarginRow justify="between" width="100%" gap={13}>
        <Text>{formatMessage(messages.label)}</Text>
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
          />
        </OriginalTextHover>
      </Box>
      <Text mb={10}>{formatMessage(messages.imageNoFormulaLabel)}</Text>
      <ImageUpload
        image={noFormulaImageUrl}
        loading={uploadImageLoading}
        onAddImage={handleAddImage}
        onDeleteImage={handleDeleteImage}
        disabled={!editingPossible}
        acceptedFormats={['JPG', 'PNG', 'GIF']}
      />
    </Column>
  );
};

NoFormulaMessage.propTypes = {
  id: PropTypes.string,
  changeAction: PropTypes.func,
  uploadImage: PropTypes.func,
  deleteImage: PropTypes.func,
  noFormulaText: PropTypes.string,
  noFormulaImageUrl: PropTypes.string,
  originalText: PropTypes.object,
  uploadImageLoading: PropTypes.bool,
};

const mapDispatchToProps = {
  changeAction: changeNoFormulaText,
  uploadImage: uploadTextMessageImageRequest,
  deleteImage: deleteTextMessageImageRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(NoFormulaMessage);

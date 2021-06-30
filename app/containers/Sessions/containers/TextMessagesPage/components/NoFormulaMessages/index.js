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
import { changeNoFormulaText } from 'global/reducers/textMessages';

import VariableChooser from 'containers/VariableChooser';

import { NoMarginRow } from 'components/ReactGridSystem';
import Text from 'components/Text';
import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';

import messages from './messages';
import { TextMessagesContext } from '../../utils';
import settingsMessages from '../../containers/TextMessageSettings/messages';

const NoFormulaMessage = ({ noFormulaText, changeAction }) => {
  const {
    sessionId,
    interventionId,
    formatMessage,
    editingPossible,
  } = useContext(TextMessagesContext);

  const handleAddVariable = variable => {
    const variableHelper = new VariableHelper(variable);

    changeAction(
      `${noFormulaText ??
        ''}${variableHelper.getFormattedVariableForDynamicInput()}`,
    );
  };

  return (
    <Column justify="center">
      <NoMarginRow justify="between" width="100%">
        <Text mr={13} fontSize={15} fontWeight="bold">
          {formatMessage(messages.label)}
        </Text>
        <VariableChooser
          disabled={!editingPossible}
          interventionId={interventionId}
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
          sessionId={sessionId}
          includeAllVariables
          includeCurrentSession
          includeNonDigitVariables
          isMultiSession
        >
          <Text fontWeight="bold" color={themeColors.secondary}>
            {formatMessage(settingsMessages.addVariableButton)}
          </Text>
        </VariableChooser>
      </NoMarginRow>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
        <StyledInput
          disabled={!editingPossible}
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.textMessagePlaceholder)}
          value={noFormulaText || ''}
          onBlur={changeAction}
        />
      </Box>
    </Column>
  );
};

NoFormulaMessage.propTypes = {
  changeAction: PropTypes.func,
  noFormulaText: PropTypes.string,
};

const mapDispatchToProps = {
  changeAction: changeNoFormulaText,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(NoFormulaMessage);

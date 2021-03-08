import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from 'components/Text';
import Img from 'components/Img';
import Row from 'components/Row';
import {
  changeSchedulingType,
  changeSchedulingValue,
  changeSchedulingFrequency,
  fetchVariantsRequest,
  removeTextMessageRequest,
  changeTileName,
} from 'global/reducers/textMessages';
import binNoBg from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import TextMessagesFormula from '../../components/TextMessagesFormula';
import TextMessageVariants from '../../components/TextMessageVariants';
import { StyledSmsSettings, SectionDivider } from './styled';
import { TextMessagesContext } from '../../utils';
import messages from './messages';
import TextMessageScheduling from '../../components/TextMessageScheduling';
import FormulaSwitcher from '../../components/FormulaSwitcher';
import NoFormulaMessage from '../../components/NoFormulaMessages';

const TextMessageSettings = ({
  changeSchedulingTypeAction,
  changeSchedulingValueAction,
  changeSchedulingFrequencyAction,
  fetchVariants,
  removeTextMessage,
  changeTileNameAction,
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
      formula,
      endAt,
      isUsedFormula,
      noFormulaText,
    },
  } = useContext(TextMessagesContext);

  useEffect(() => {
    fetchVariants();
  }, [id]);

  const messageSection = () => {
    if (isUsedFormula)
      return (
        <>
          <TextMessagesFormula disabled={!editingPossible} formula={formula} />
          <TextMessageVariants />
        </>
      );
    return <NoFormulaMessage noFormulaText={noFormulaText} />;
  };

  return (
    <StyledSmsSettings>
      <Row align="center" justify="between">
        <Text fontSize={18} fontWeight="bold">
          {formatMessage(messages.header)}
        </Text>
        <Img
          src={binNoBg}
          onClick={() => removeTextMessage(id)}
          mr={10}
          clickable
          disabled={!editingPossible}
        />
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
      <TextMessageScheduling
        id={id}
        selectedOption={schedule}
        frequency={frequency}
        endAt={endAt}
        formatMessage={formatMessage}
        value={schedulePayload}
        onChangeOption={changeSchedulingTypeAction}
        onChangeValue={changeSchedulingValueAction}
        onChangeFrequency={changeSchedulingFrequencyAction}
        disabled={!editingPossible}
      />
      <SectionDivider />
      <FormulaSwitcher isUsedFormula={isUsedFormula} />
      {messageSection()}
    </StyledSmsSettings>
  );
};

TextMessageSettings.propTypes = {
  changeSchedulingTypeAction: PropTypes.func,
  changeSchedulingValueAction: PropTypes.func,
  changeSchedulingFrequencyAction: PropTypes.func,
  fetchVariants: PropTypes.func,
  removeTextMessage: PropTypes.func,
  changeTileNameAction: PropTypes.func,
};

const mapDispatchToProps = {
  changeSchedulingTypeAction: changeSchedulingType,
  changeSchedulingValueAction: changeSchedulingValue,
  changeSchedulingFrequencyAction: changeSchedulingFrequency,
  changeTileNameAction: changeTileName,
  fetchVariants: fetchVariantsRequest,
  removeTextMessage: removeTextMessageRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(TextMessageSettings);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/Box';
import { colors, themeColors } from 'theme';
import { StyledInput } from 'components/Input/StyledInput';
import Row from 'components/Row';
import Loader from 'components/Loader';
import Img from 'components/Img';
import stopButton from 'assets/svg/stop-button-1.svg';
import playButton from 'assets/svg/play-button-1.svg';
import Text from 'components/Text';
import Column from 'components/Column';
import { nameQuestion } from 'models/Session/QuestionTypes';
import messages from './messages';

const SpeechInput = ({
  disabled,
  formatMessage,
  text,
  handleBlur,
  setHasFocus,
  hasFocus,
  isSpeechUpdating,
  isPlaying,
  handleButtonClick,
  nameQuestionExists,
}) => {
  const [inputValue, setInputValue] = useState(text);

  const BUTTON_MARGIN = '10px';

  const button = isPlaying ? stopButton : playButton;

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <Img src={button} onClick={handleButtonClick} clickable />;
  };

  const handleAddVariable = () => {
    document.activeElement.blur();
    const newValue = `${inputValue} ${nameQuestion.reservedVariable}`;
    handleBlur(newValue);
    setInputValue(newValue);
  };

  const handleInput = e => setInputValue(e.target.value);

  return (
    <Column>
      {nameQuestionExists && (
        <Row mt={15} width="100%" align="center" justify="end">
          <Text
            fontWeight="bold"
            color={themeColors.secondary}
            clickable
            onClick={handleAddVariable}
            disabled={hasFocus || isSpeechUpdating}
          >
            {formatMessage(messages.addNameVariable)}
          </Text>
        </Row>
      )}
      <Box position="relative">
        <Box mt={15} bg={colors.linkWater} width="100%">
          <StyledInput
            disabled={disabled}
            type="multiline"
            rows="10"
            placeholder={formatMessage(messages.speechPlaceholder)}
            value={text}
            onBlur={handleBlur}
            onFocus={() => setHasFocus(true)}
            onInput={handleInput}
          />
        </Box>
        <Box
          position="absolute"
          bottom={BUTTON_MARGIN}
          right={BUTTON_MARGIN}
          hidden={hasFocus}
        >
          {renderButton()}
        </Box>
      </Box>
    </Column>
  );
};

SpeechInput.propTypes = {
  disabled: PropTypes.bool,
  formatMessage: PropTypes.func,
  text: PropTypes.string,
  handleBlur: PropTypes.func,
  setHasFocus: PropTypes.func,
  hasFocus: PropTypes.bool,
  isSpeechUpdating: PropTypes.bool,
  isPlaying: PropTypes.bool,
  handleButtonClick: PropTypes.func,
  nameQuestionExists: PropTypes.bool,
};

export default SpeechInput;

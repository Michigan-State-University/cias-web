import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { colors, themeColors } from 'theme';
import { nameQuestion } from 'models/Session/QuestionTypes';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Row from 'components/Row';
import Loader from 'components/Loader';
import Text from 'components/Text';
import Column from 'components/Column';
import { PlayStopButton } from 'components/ActionIcons';
import OriginalTextHover from 'components/OriginalTextHover';

import messages from './messages';

const SpeechInput = ({
  id,
  disabled,
  formatMessage,
  text,
  originalText,
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

  const renderButton = () => {
    if (isSpeechUpdating) return <Loader size={24} type="inline" />;

    return <PlayStopButton isPlaying={isPlaying} onClick={handleButtonClick} />;
  };

  const handleAddVariable = () => {
    document.activeElement.blur();
    const newValue = `${inputValue} ${nameQuestion.reservedVariable}`;
    handleBlur(newValue);
    setInputValue(newValue);
  };

  const handleInput = (e) => setInputValue(e.target.value);

  const originalTextJoined = useMemo(
    () => (originalText ?? []).join(''),
    [originalText],
  );

  return (
    <OriginalTextHover
      id={id}
      text={originalTextJoined}
      align="end"
      position="relative"
      iconProps={{
        position: 'absolute',
        right: 54,
        bottom: 12,
      }}
      width="100%"
    >
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
    </OriginalTextHover>
  );
};

SpeechInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  formatMessage: PropTypes.func,
  text: PropTypes.string,
  originalText: PropTypes.array,
  handleBlur: PropTypes.func,
  setHasFocus: PropTypes.func,
  hasFocus: PropTypes.bool,
  isSpeechUpdating: PropTypes.bool,
  isPlaying: PropTypes.bool,
  handleButtonClick: PropTypes.func,
  nameQuestionExists: PropTypes.bool,
};

export default SpeechInput;

import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import Row from 'components/Row';
import Box from 'components/Box';
import { themeColors } from 'theme';

import messages from './messages';

const NameQuestionLayout = ({
  onChange,
  formatMessage,
  answerBody,
  disabled,
}) => {
  const { name, phoneticName } =
    answerBody && answerBody.value ? answerBody.value : {};
  const inputStyles = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  };

  const handleNameChange = value => onChange({ name: value, phoneticName });
  const handlePhoneticNameChange = value =>
    onChange({ name, phoneticName: value });

  return (
    <Row width="100%" justify="between">
      <Box
        bg={themeColors.highlight}
        width="100%"
        maxWidth={300}
        px={21}
        py={14}
        justify="center"
        height="calc(100% - 30px)"
      >
        <ApprovableInput
          type="singleline"
          value={name ?? ''}
          placeholder={formatMessage(messages.enterName)}
          onCheck={handleNameChange}
          styles={inputStyles}
          disabled={disabled}
        />
      </Box>

      <TextVoicePreviewInput
        value={phoneticName}
        placeholder={formatMessage(messages.enterNamePhonetically)}
        onBlur={handlePhoneticNameChange}
        styles={inputStyles}
        disabled={disabled}
      />
    </Row>
  );
};

NameQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default NameQuestionLayout;

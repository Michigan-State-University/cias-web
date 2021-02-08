import React from 'react';
import PropTypes from 'prop-types';

import ApprovableInput from 'components/Input/ApprovableInput';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';
import Row from 'components/Row';
import Box from 'components/Box';
import { themeColors } from 'theme';

import messages from './messages';

const NameQuestionLayout = ({ onChange, formatMessage, answerBody }) => {
  const value = answerBody && answerBody.value ? answerBody.value : '';
  const inputStyles = { width: '100%', height: '100%', textAlign: 'center' };

  return (
    <Row width="100%" justify="between">
      <Box
        bg={themeColors.highlight}
        width="100%"
        maxWidth={300}
        px={21}
        py={14}
      >
        <ApprovableInput
          type="singleline"
          value={value}
          placeholder={formatMessage(messages.enterName)}
          onCheck={onChange}
          styles={inputStyles}
        />
      </Box>
      <Box
        bg={themeColors.highlight}
        width="100%"
        maxWidth={300}
        px={21}
        py={14}
      >
        <TextVoicePreviewInput
          value={value}
          placeholder={formatMessage(messages.enterNamePhonetically)}
          onCheck={onChange}
          styles={inputStyles}
        />
      </Box>
    </Row>
  );
};

NameQuestionLayout.propTypes = {
  onChange: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default NameQuestionLayout;

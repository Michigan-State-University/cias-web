import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Row from 'components/Row';
import { TextArea } from 'components/Input/TextArea';
import { themeColors } from 'theme';

import messages from './messages';

const TextBoxQuestionLayout = ({ formatMessage, onChange, answerBody }) => {
  const value =
    answerBody && answerBody.value ? answerBody.value.toString() : '';
  return (
    <Box bg={themeColors.highlight} width="100%" px={21} py={14}>
      <Row>
        <TextArea
          value={value}
          transparent
          placeholder={formatMessage(messages.textPlaceholder)}
          rows="5"
          width="100%"
          onChange={onChange}
          aria-label={formatMessage(messages.textPlaceholder)}
        />
      </Row>
    </Box>
  );
};

TextBoxQuestionLayout.propTypes = {
  formatMessage: PropTypes.func,
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TextBoxQuestionLayout;

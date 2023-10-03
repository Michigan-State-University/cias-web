import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { themeColors } from 'theme';

import Box from 'components/Box';
import Row from 'components/Row';
import { TextArea } from 'components/Input/TextArea';
import Comment from 'components/Text/Comment';
import Column from 'components/Column';

import messages from './messages';
import { QUESTION_SUBTITLE_ID, QUESTION_TITLE_ID } from '../constants';

const TextBoxQuestionLayout = ({
  formatMessage,
  onChange,
  answerBody,
  textLimit,
  disabled,
}) => {
  const value =
    answerBody && answerBody.value ? answerBody.value.toString() : '';

  const isTextLimited = textLimit > 0;

  return (
    <Column>
      <Box bg={themeColors.highlight} width="100%" px={21} py={14}>
        <Row>
          <TextArea
            value={value}
            transparent
            placeholder={formatMessage(messages.textPlaceholder)}
            rows="5"
            width="100%"
            onChange={onChange}
            aria-labelledby={`${QUESTION_TITLE_ID} ${QUESTION_SUBTITLE_ID}`}
            {...(isTextLimited && { maxLength: `${textLimit}` })}
            disabled={disabled}
          />
        </Row>
      </Box>

      <Comment mt={5}>
        <Markup
          content={formatMessage(messages.textBoxQuestionRemainingCharacters, {
            remaining: isTextLimited ? textLimit - value.length : '&infin;',
          })}
          noWrap
        />
      </Comment>
    </Column>
  );
};

TextBoxQuestionLayout.propTypes = {
  formatMessage: PropTypes.func,
  onChange: PropTypes.func,
  answerBody: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textLimit: PropTypes.number,
  disabled: PropTypes.bool,
};

export default TextBoxQuestionLayout;

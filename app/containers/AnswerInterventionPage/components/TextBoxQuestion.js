import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import { TextArea } from 'components/Input/TextArea';
import { themeColors } from 'theme';
import messages from './messages';

const TextBoxQuestion = ({ question, selectAnswer, formatMessage }) => {
  const {
    body: { variable },
  } = question;
  return (
    <Box my={10} bg={themeColors.highlight}>
      <Row>
        <TextArea
          transparent
          placeholder={formatMessage(messages.answerPlaceholder)}
          rows="5"
          width="100%"
          onChange={e => {
            selectAnswer({
              variable,
              payload: e.target.value,
            });
          }}
        />
      </Row>
    </Box>
  );
};

TextBoxQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
};

export default TextBoxQuestion;

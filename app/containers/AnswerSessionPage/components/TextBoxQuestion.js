import React from 'react';
import PropTypes from 'prop-types';

import TextBoxQuestionLayout from '../layouts/TextBoxQuestionLayout';

const TextBoxQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  disabled,
}) => {
  const {
    body: {
      variable: { name },
    },
    settings: { text_limit: textLimit },
  } = question;

  const onChange = (event) => {
    const { value } = event.target;
    if (!value.trim()) {
      selectAnswer(null);
      return;
    }
    selectAnswer([
      {
        var: name,
        value,
      },
    ]);
  };
  return (
    <TextBoxQuestionLayout
      formatMessage={formatMessage}
      answerBody={answerBody?.[0]}
      onChange={onChange}
      textLimit={textLimit}
      disabled={disabled}
    />
  );
};

TextBoxQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.any,
  disabled: PropTypes.bool,
};

export default TextBoxQuestion;

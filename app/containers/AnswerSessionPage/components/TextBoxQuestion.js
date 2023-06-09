import React from 'react';
import PropTypes from 'prop-types';

import TextBoxQuestionLayout from '../layouts/TextBoxQuestionLayout';

const TextBoxQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
}) => {
  const {
    body: {
      variable: { name },
    },
    settings: { text_limit: textLimit },
  } = question;

  const onChange = (event) => {
    selectAnswer([
      {
        var: name,
        value: event.target.value,
      },
    ]);
  };
  return (
    <TextBoxQuestionLayout
      formatMessage={formatMessage}
      answerBody={answerBody?.[0]}
      onChange={onChange}
      textLimit={textLimit}
    />
  );
};

TextBoxQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.any,
};

export default TextBoxQuestion;

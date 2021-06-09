import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';

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
  } = question;

  const onChange = event => {
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
    />
  );
};

TextBoxQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
  answerBody: PropTypes.any,
};

export default TextBoxQuestion;

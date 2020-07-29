import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';

import NumberQuestionLayout from '../layouts/NumberQuestionLayout';

const NumberQuestion = ({
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
    selectAnswer({
      var: name,
      payload: parseInt(event, 10),
    });
  };
  return (
    <NumberQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody}
    />
  );
};

NumberQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default NumberQuestion;

import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';

import NameQuestionLayout from '../layouts/NameQuestionLayout';

const NameQuestion = ({
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
        value: event,
      },
    ]);
  };

  return (
    <NameQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody[0]}
    />
  );
};

NameQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default NameQuestion;

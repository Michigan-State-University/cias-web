import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';

import PhoneQuestionLayout from '../layouts/PhoneQuestionLayout';

const PhoneQuestion = ({
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
    const { prefix, number } = event?.phoneAttributes ?? {};
    selectAnswer([
      {
        var: name,
        value: `${prefix}${number}`,
      },
    ]);
  };

  return (
    <PhoneQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody[0]}
    />
  );
};

PhoneQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default PhoneQuestion;

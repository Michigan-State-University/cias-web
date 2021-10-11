import React from 'react';
import PropTypes from 'prop-types';

import { QuestionDTO } from 'models/Question';

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

  const onChange = (event) => {
    const { prefix, number, iso, confirmed } = event ?? {};
    selectAnswer([
      {
        var: name,
        value: { prefix, number, confirmed, iso },
      },
    ]);
  };

  return (
    <PhoneQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody?.[0]}
    />
  );
};

PhoneQuestion.propTypes = {
  question: PropTypes.shape(QuestionDTO).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default PhoneQuestion;

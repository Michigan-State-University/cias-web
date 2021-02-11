import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import CurrencyQuestionLayout from '../layouts/CurrencyQuestionLayout';

const CurrencyQuestion = ({
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

  const onChange = value => {
    if (isNullOrUndefined(value)) return;

    selectAnswer([
      {
        var: name,
        value,
      },
    ]);
  };

  return (
    <CurrencyQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody[0]}
    />
  );
};

CurrencyQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default CurrencyQuestion;

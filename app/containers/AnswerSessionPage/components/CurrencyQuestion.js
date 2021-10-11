import React from 'react';
import PropTypes from 'prop-types';

import { QuestionDTO } from 'models/Question';

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

  const onChange = (value, selectedByUser = true) => {
    if (isNullOrUndefined(value)) return;

    selectAnswer(
      [
        {
          var: name,
          value,
        },
      ],
      selectedByUser,
    );
  };

  return (
    <CurrencyQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody?.[0]}
    />
  );
};

CurrencyQuestion.propTypes = {
  question: PropTypes.shape(QuestionDTO).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default CurrencyQuestion;
